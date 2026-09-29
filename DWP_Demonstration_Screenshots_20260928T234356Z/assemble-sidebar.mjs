/** Offline pixel redaction and uniform derivatives. Never connects to a live page. */
import {createRequire} from 'node:module';
import {readFile,writeFile,copyFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {constants} from 'node:fs';
import {join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const out=dirname(fileURLToPath(import.meta.url));
const require=createRequire('/Users/crpage/repos/okf-explorer/apps/okf-explorer/package.json');
const {chromium}=require('@playwright/test');
const hash=b=>createHash('sha256').update(b).digest('hex');
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
const manifest=JSON.parse(await readFile(join(out,'capture-manifest.json'),'utf8'));
const config=JSON.parse(await readFile(join(out,'receipts/S12-capture-config.json'),'utf8'));
const shot=manifest.shots.find(s=>s.id==='S12');
await copyFile(join(out,'receipts/S12.json'),join(out,'receipts/S12-original-pack-receipt.json'),constants.COPYFILE_EXCL).catch(e=>{if(e.code!=='EEXIST')throw e;});
Object.assign(shot,config.shot);
shot.frames=[];shot.redactions=[];
const browser=await chromium.launch({channel:'chrome',headless:true});
const context=await browser.newContext({viewport:{width:1920,height:1080},deviceScaleFactor:1,locale:'en-GB',timezoneId:'Europe/London'});
const page=await context.newPage();
const info=async path=>{const b=await readFile(join(out,path));return {path,bytes:b.length,sha256:hash(b),pixels:{width:b.readUInt32BE(16),height:b.readUInt32BE(20)}};};
try{
for(const capture of config.captures){
  const original=await readFile(capture.source);
  // Native capture returns encoded bytes, not necessarily PNG, even when the
  // staging filename uses .png. Decode the actual format before rendering.
  const mime=original[0]===0xff&&original[1]===0xd8?'image/jpeg':'image/png';
  const {width,height}=config.shot.browser.pixel_dimensions;
  await page.setContent('<canvas id="capture"></canvas>');
  const clean=await page.evaluate(async({base64,mime,width,height,rectangles})=>{
    const image=new Image();image.src='data:'+mime+';base64,'+base64;await image.decode();
    if(image.naturalWidth!==width||image.naturalHeight!==height)throw Error('Native image dimensions differ from receipt');
    const canvas=document.getElementById('capture');canvas.width=width;canvas.height=height;
    const ctx=canvas.getContext('2d');ctx.drawImage(image,0,0);
    for(const r of rectangles){ctx.fillStyle=r.colour||'#ffffff';ctx.fillRect(r.x,r.y,r.width,r.height);}
    return canvas.toDataURL('image/png').split(',')[1];
  },{base64:original.toString('base64'),mime,width,height,rectangles:capture.redactions});
  const rawPath='raw/'+capture.id+'-privacy-redacted.png';
  await writeFile(join(out,rawPath),Buffer.from(clean,'base64'));
  const raw=await info(rawPath);
  shot.redactions.push({capture_id:capture.id,source_sha256:hash(original),source_bytes:original.length,source_encoding:mime,original_outside_pack:true,method:'Native JPEG bytes decoded and saved as PNG; opaque pixel replacement of private browser chrome only, baked into every delivered master before annotation; original bytes never embedded in delivered HTML.',rectangles:capture.redactions,redacted_master:raw});
  for(const detail of capture.frames){
    const c=detail.crop;
    if(c.x<0||c.y<0||c.x+c.width>width||c.y+c.height>height)throw Error('Out-of-bounds crop '+detail.id);
    const fit=Math.min(1824/c.width,870/c.height),dw=c.width*fit,dh=c.height*fit;
    const safe=await readFile(join(out,rawPath));
    const html=`<!doctype html><html lang="en-GB"><meta charset="utf-8"><style>*{box-sizing:border-box}body{margin:0;background:#edf1f4;font-family:Arial,sans-serif;color:#172b3a}header{height:108px;padding:20px 48px;background:#143a56;color:white}h1{font-size:30px;margin:4px 0}header p{font-size:18px;margin:0}.clip{position:absolute;left:${(1920-dw)/2}px;top:${116+(870-dh)/2}px;width:${dw}px;height:${dh}px;overflow:hidden;background:white}.clip img{position:absolute;width:${width*fit}px;max-width:none;left:${-c.x*fit}px;top:${-c.y*fit}px}footer{position:absolute;bottom:0;left:0;width:100%;height:86px;padding:12px 48px;background:white;border-top:2px solid #aab8c4;font-size:20px;line-height:1.3}</style><header><p>${esc('S12 · main · '+shot.classification+' · '+shot.status)}</p><h1>${esc(detail.label)}</h1></header><div class="clip"><img src="data:image/png;base64,${safe.toString('base64')}"></div><footer>${esc(detail.caption)}<br><span style="font-size:17px">${esc(detail.source_label||'Actual browser-owned sidebar and workbench pixels; browser-profile chrome privacy-redacted.')}</span></footer></html>`;
    const layer='slide-ready/'+detail.id+'.html',path='slide-ready/'+detail.id+'.png';
    const fixed=html.replace('<style>','<style>html,body{width:1920px;height:1080px;overflow:hidden;overflow-anchor:none}');
    await writeFile(join(out,layer),fixed);await page.setContent(fixed);await page.locator('img').evaluate(i=>i.decode());await page.evaluate(()=>document.fonts.ready);await page.evaluate(()=>window.scrollTo(0,0));
    const header=await page.evaluate(()=>({scrollY,top:document.querySelector('header p').getBoundingClientRect().top,bottom:document.querySelector('header h1').getBoundingClientRect().bottom}));
    if(header.scrollY!==0||header.top<0||header.bottom>108)throw Error('Caption layout is outside its strip: '+detail.id);
    await page.screenshot({path:join(out,path)});
    shot.frames.push({id:detail.id,label:detail.label,caption:detail.caption,source_label:detail.source_label||'Native Edge whole-window capture; private browser chrome redacted.',actual_url:capture.actual_url,captured_at:capture.captured_at,css_width:width,css_width_note:'Pixel-coordinate reference only, not a claimed CSS viewport width.',raw,derivative:await info(path),annotation_layer:layer,crop:{raw_pixels:c,fit_scale:fit,method:'Uniform scaling and letterboxing of real privacy-redacted pixels, separate caption strip.'}});
  }
}
manifest.parent_run_id='20260928T221244Z';manifest.run_id='20260928T234356Z';
manifest.started_at='2026-09-28T23:43:56Z';manifest.inherited_capture_note='All non-S12 images and original capture timestamps are preserved from the parent run, not recaptured.';
manifest.boundaries.sidebar_turns_sent=config.shot.sidebar_turns_sent;
manifest.boundaries.sidebar_turn_accounting=config.shot.sidebar_turn_accounting;
manifest.boundaries.answer_model_calls=null;
manifest.boundaries.answer_model_calls_note='No capture-runner model calls or comparisons. Two identical follow-up attempts submitted in this resumption; owner-created first turn observed retrospectively. Underlying model-call counts and usage unknown. Parent-run prompt preserved separately.';
manifest.boundaries.permission_changes=[config.shot.permission_exception];
await writeFile(join(out,'capture-manifest.json'),JSON.stringify(manifest,null,2)+'\n');
await writeFile(join(out,'receipts/S12.json'),JSON.stringify(shot,null,2)+'\n');
console.log(JSON.stringify({frames:shot.frames.length,status:shot.status,redacted_masters:shot.redactions.length},null,2));
}finally{await browser.close();}
