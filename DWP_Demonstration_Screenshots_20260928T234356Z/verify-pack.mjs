/** Bounded offline verification and provenance enrichment. No model or browser calls. */
import {readFile, writeFile, readdir, stat, mkdir, rename} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {dirname, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
const out=resolve(process.argv[2]||dirname(fileURLToPath(import.meta.url)));
const digest=b=>createHash('sha256').update(b).digest('hex');
const readJson=async p=>JSON.parse(await readFile(join(out,p),'utf8'));
const save=async(p,v)=>writeFile(join(out,p),JSON.stringify(v,null,2)+'\n');
const manifest=await readJson('capture-manifest.json');
const resumed=await readJson('receipts/S12-resume-observation.json');
const sidebar=manifest.shots.find(x=>x.id==='S12');
// Preserve legacy receipts. A separately authorised native-capture resumption
// must not be overwritten with the parent's blocked state.
if(!sidebar.permission_exception){
await readFile(join(out,'receipts/S12-initial-privacy-blocker.json')).catch(async()=>save('receipts/S12-initial-privacy-blocker.json',sidebar));
sidebar.status='blocked';sidebar.classification='real sidebar prompt accepted; tool invocation and transition unverified';
sidebar.initial_attempt_receipt='receipts/S12-initial-privacy-blocker.json';
sidebar.resume_receipt='receipts/S12-resume-observation.json';
sidebar.sidebar_turns_sent=resumed.turns_submitted;
sidebar.technical_retries=1;
sidebar.actions=[{action:'owner sign-in and clean-window preparation'},{action:'native sidebar prompt submitted',turn:1,timestamp_precision:'minute',local_time:resumed.submitted_at_local_minute}];
sidebar.errors=[...(sidebar.errors||[]).filter(x=>x.kind!=='origin-access-denied'),{kind:'origin-access-denied',reason:resumed.final_blocker}];
sidebar.host_route='Existing ChatGPT sidebar accepted one turn; completed registered-tool route unverified';
sidebar.tool_schemas='Not verified in completed sidebar output';
sidebar.actual_tool_calls=[];sidebar.actual_tool_calls_note='Empty means no calls verified by this capture, not proof that the independent sidebar made no calls.';
sidebar.snapshot_result_revision_identities=null;
sidebar.actual_url='https://chris-page-gov.github.io/okf-explorer/evidence/?manifest=https%3A%2F%2Fraw.githubusercontent.com%2Fchris-page-gov%2Fokf-dwp%2Fd31f16fb7143d04b9de73e14cd493cfb832ae83e%2Fevaluation%2Fevidence-workbench%2Ftools-manifest.json&case=staff-016&record=https%3A%2F%2Fchris-page-gov.github.io%2Fokf-dwp%2Fid%2Fstaff-domain%2Fcalculation&tab=requirements';
sidebar.case_id='staff-016';sidebar.record_id='https://chris-page-gov.github.io/okf-dwp/id/staff-domain/calculation';
sidebar.actual_evidence_status='insufficient as displayed in the initial native page observation; no completed sidebar-returned tool result verified';
sidebar.browser={surface:'real Microsoft Edge window with ChatGPT sidebar',version:null,version_status:'not independently read',native_zoom_percent:resumed.observed_native_zoom_percent,viewport_css:null,pixel_dimensions:null,dimensions_status:'No final deliverable native-window bitmap retained'};
manifest.boundaries.sidebar_turns_sent=1;
manifest.boundaries.answer_model_calls=null;
manifest.boundaries.answer_model_calls_note='No capture-runner answer model or evaluation calls. One existing ChatGPT sidebar turn submitted; underlying calls/usage unobserved.';
}
const checks=[];
const check=(name,passed,detail)=>{checks.push({name,passed,detail});if(!passed)throw Error(name+': '+JSON.stringify(detail));};
const expectedPaths=new Set();
for(const shot of manifest.shots){
  shot.actual_url ||= shot.frames[0]?.actual_url || null;
  shot.captured_at ||= shot.frames[0]?.captured_at || null;
  shot.data_bindings=(shot.network||[]).filter(x=>/\.json(?:\?|$)/.test(x.url));
  shot.observed_application_assets=(shot.network||[]).filter(x=>/\.(?:js|css)(?:\?|$)/.test(x.url));
  shot.source_commits=[...new Set([shot.actual_url,...shot.data_bindings.map(x=>x.url)].filter(Boolean).flatMap(x=>[...x.matchAll(/(?:githubusercontent\.com\/[^/]+\/[^/]+\/|github\.com\/[^/]+\/[^/]+\/blob\/)([a-f0-9]{40})/g)].map(m=>m[1])))];
  if(shot.id==='S07')shot.actual_evidence_status=shot.assembly.evidence_status;
  if(shot.id==='S05')shot.actual_evidence_status='insufficient in retained historical record; no replay performed';
  if(['S09','S10','S11'].includes(shot.id))shot.actual_evidence_status='insufficient';
  if(['S01','S06'].includes(shot.id))shot.actual_evidence_status='not applicable: original retained PDF, not an assembled answer';
  if(['S02','S03','S04','S14','S15','S16'].includes(shot.id))shot.actual_evidence_status='not applicable to this view; preserve native candidate/report warnings';
  const retryLimit=shot.id==='S12'&&shot.permission_exception?10:1;
  check(shot.id+' technical retry bound',(shot.technical_retries||0)<=retryLimit,{retries:shot.technical_retries,limit:retryLimit});
  check(shot.id+' blocked has no placeholder',shot.status!=='blocked'||shot.frames.length===0||(shot.id==='S12'&&shot.native_failure_evidence===true&&shot.successful_transition_claim===false),{frames:shot.frames.length,native_failure_evidence:shot.native_failure_evidence});
  for(const frame of shot.frames){
    for(const info of [frame.raw,frame.derivative]){
      const b=await readFile(join(out,info.path));
      check(frame.id+' '+info.path+' SHA-256',digest(b)===info.sha256,{bytes:b.length,sha256:digest(b)});
      expectedPaths.add(info.path);
      if(info.path.startsWith('slide-ready/'))check(frame.id+' 16:9 output',b.readUInt32BE(16)===1920&&b.readUInt32BE(20)===1080,{width:b.readUInt32BE(16),height:b.readUInt32BE(20)});
    }
    expectedPaths.add(frame.annotation_layer);
    const c=frame.crop.raw_pixels;
    check(frame.id+' real non-empty in-bounds crop',c.width>0&&c.height>0&&c.x>=0&&c.y>=0&&c.x+c.width<=frame.raw.pixels.width&&c.y+c.height<=frame.raw.pixels.height,c);
    check(frame.id+' timestamp/URL supplied',!!frame.captured_at&&!!frame.actual_url,{captured_at:frame.captured_at,url:frame.actual_url});
  }
  await save('receipts/'+shot.id+'.json',shot);
}
const spec=join(out,'specification');
for(const line of (await readFile(join(spec,'SHA256SUMS.txt'),'utf8')).trim().split('\n')){
  const [expected,name]=line.split(/\s{2}/);const b=await readFile(join(spec,name));
  check('supplied input '+name+' unchanged',digest(b)===expected,expected);
  const current=await readFile(join('/Users/crpage/repos/okf-dwp/research/dwp-demo-codex-pack',name));
  check('original input '+name+' preserved',digest(current)===expected,expected);
}
const fresh=await readJson('receipts/S07-fresh-package-r1.json');
const s7=manifest.shots.find(x=>x.id==='S07');
check('fresh question exact',fresh.question==='Can Pension Credit treat capital as still held after someone has got rid of it, and are there exceptions?',fresh.question);
check('fresh budget exact',fresh.budget.max_nodes===64&&fresh.budget.max_relationships===128&&fresh.budget.max_depth===6&&fresh.budget.max_bytes===524288,fresh.budget);
check('fresh result preserves insufficient/truncated',fresh.evidence_status==='insufficient'&&fresh.budget.truncated===true,{status:fresh.evidence_status,truncated:fresh.budget.truncated});
check('technical screenshot retry preserved assembly bytes',s7.retry_assembly_byte_identical===true,s7.initial_assembly_sha256);
const u07=fresh.selected.find(x=>/\/pc-capital-u07$/.test(x.record.id));
const dmg=fresh.selected.find(x=>x.record.label.includes('84861'));
const direct=fresh.relationships.find(x=>x.source===u07?.record.id&&x.target===dmg?.record.id);
check('observed selected U07 to DMG 84861 direct link',!!direct,direct);
await save('receipts/S07-selected-path-verification.json',{observed_at:new Date().toISOString(),source_package:'receipts/S07-fresh-package-r1.json',context_id:fresh.context_id,u07:u07.record.id,dmg_84861:dmg.record.id,directed_relationship:direct,evidence_status:fresh.evidence_status,truncated:fresh.budget.truncated,not_an_ai_answer:true});
const savedManifest=await readJson('receipts/tools-manifest.json');
const savedPathAudit=[];
for(const q of savedManifest.questions){
  const local=join('/Users/crpage/repos/okf-dwp/evaluation/evidence-workbench',q.package.url);
  const bytes=await readFile(local);const p=JSON.parse(bytes);
  check('saved '+q.id+' local bytes match bound manifest',digest(bytes)===q.package.sha256,q.package.sha256);
  const selected=p.selected.filter(x=>/\/pc-capital-u07$/.test(x.record.id)||x.record.label.includes('84861')).map(x=>({id:x.record.id,label:x.record.label}));
  savedPathAudit.push({case_id:q.id,package_url:q.package.url,sha256:digest(bytes),context_id:p.context_id,evidence_status:p.evidence_status,preferred_selected: selected});
}
check('no preferred selected route in bound forty saved packages',savedPathAudit.every(x=>x.preferred_selected.length===0),savedPathAudit.filter(x=>x.preferred_selected.length));
await save('receipts/saved-capital-path-resolution.json',{observed_at:new Date().toISOString(),scope:'Read existing saved bytes only; no replay, trial or assembly performed.',manifest:'receipts/tools-manifest.json',cases:savedPathAudit,preferred_route_found:false,fallback_case:'staff-006',fallback_record:manifest.shots.find(x=>x.id==='S08').record_id});
const roots=['/Users/crpage/repos/okf-dwp','/Users/crpage/repos/okf-explorer'];
for(const root of roots){
  const baseline=manifest.baseline.repositories.find(x=>x.root===root);
  const git=(...args)=>execFileSync('git',['-C',root,...args],{encoding:'utf8'}).trim();
  check(root+' commit unchanged',git('rev-parse','HEAD')===baseline.commit,baseline.commit);
  check(root+' tracked work unchanged',git('diff','--name-only','HEAD')==='',git('diff','--name-only','HEAD'));
  check(root+' status unchanged',git('status','--porcelain=v1')===baseline.status_porcelain,git('status','--porcelain=v1'));
  check(root+' branch unchanged',git('branch','--show-current')===baseline.branch,baseline.branch);
}
const retiredDirectory=join(dirname(out),'rejected-drafts-'+manifest.run_id);
await mkdir(retiredDirectory,{recursive:true});
const retired=await readJson('receipts/retired-drafts.json').catch(()=>({reason:'Recoverably moved rejected/unreferenced draft images outside the deliverable. Initial failures remain in JSON receipts; no placeholder or unfinished canvas is presented as a finished capture.',files:[]}));
for(const dir of ['raw','slide-ready'])for(const name of await readdir(join(out,dir))){
  const rel=dir+'/'+name;if(expectedPaths.has(rel))continue;
  const b=await readFile(join(out,rel));const destination=join(retiredDirectory,dir,name);
  await mkdir(dirname(destination),{recursive:true});await rename(join(out,rel),destination);
  retired.files.push({original_path:rel,retained_outside_pack:destination,bytes:b.length,sha256:digest(b)});
}
await save('receipts/retired-drafts.json',retired);
check('all 16 specifications have actual outcomes',manifest.shots.length===16,manifest.shots.map(x=>({id:x.id,status:x.status})));
if(sidebar.permission_exception){
  const parent=JSON.parse(await readFile(join(dirname(out),'20260928T221244Z','capture-manifest.json'),'utf8'));
  for(const prior of parent.shots.filter(s=>s.id!=='S12'))for(const f of prior.frames){
    const current=manifest.shots.find(s=>s.id===prior.id).frames.find(x=>x.id===f.id);
    for(const kind of ['raw','derivative'])check(f.id+' inherited '+kind+' unchanged',current[kind].sha256===f[kind].sha256&&digest(await readFile(join(out,current[kind].path)))===f[kind].sha256,f[kind].sha256);
  }
  const parentZip=await readFile(join(dirname(out),'DWP_Demonstration_Screenshots_20260928T221244Z.zip'));
  check('original ZIP preserved',digest(parentZip)==='1a06a057fd7f8746f6683792d5852cdf811804ed1e404ffdcef05979096d6235',digest(parentZip));
  check('original S12 receipt preserved',digest(await readFile(join(out,'receipts/S12-original-pack-receipt.json')))===digest(await readFile(join(dirname(out),'20260928T221244Z','receipts/S12.json'))),'byte-identical original receipt');
  check('reported snapshot matches retained manifest',sidebar.snapshot_result_revision_identities.snapshot_id==='sha256:'+digest(await readFile(join(out,'receipts/tools-manifest.json'))),sidebar.snapshot_result_revision_identities.snapshot_id);
  check('sidebar permission exact origin only',sidebar.permission_exception.origin==='https://chris-page-gov.github.io'&&sidebar.permission_exception.owner_explicitly_authorised===true,sidebar.permission_exception);
  check('sidebar attempts within expanded ceiling',sidebar.resumption_attempts<=10,{attempts:sidebar.resumption_attempts,ceiling:10});
  check('sidebar outcome not misrepresented',sidebar.status==='captured'?sidebar.state_transition?.verified===true&&sidebar.successful_transition_claim===true:sidebar.successful_transition_claim===false,{status:sidebar.status,transition:sidebar.state_transition});
  check('sidebar native masters privacy-redacted',sidebar.frames.length>0&&sidebar.frames.every(f=>f.raw.path.endsWith('-privacy-redacted.png')),sidebar.frames.map(f=>f.raw.path));
  for(const redaction of sidebar.redactions){
    check(redaction.capture_id+' original outside pack',redaction.original_outside_pack===true,redaction.source_sha256);
    for(const f of sidebar.frames.filter(f=>f.raw.path===redaction.redacted_master.path)){
      const html=await readFile(join(out,f.annotation_layer),'utf8');
      const embedded=Buffer.from(html.match(/data:image\/png;base64,([^"']+)/)?.[1]||'','base64');
      check(f.id+' HTML contains only redacted pixels',digest(embedded)===f.raw.sha256&&digest(embedded)!==redaction.source_sha256,digest(embedded));
    }
  }
}else check('sidebar not misrepresented',sidebar.status==='blocked',sidebar.status);
await save('capture-manifest.json',manifest);
const counts={main:{},reserve:{}};
for(const s of manifest.shots)counts[s.priority][s.status]=(counts[s.priority][s.status]||0)+1;
await save('receipts/pack-verification.json',{observed_at:new Date().toISOString(),scope:'Bounded file identity, crop geometry, input preservation, package invariants and unchanged checkout checks. Not answer accuracy, legal review or universal host compatibility.',counts,frames:manifest.shots.reduce((n,s)=>n+s.frames.length,0),checks,passed:checks.every(x=>x.passed)});
console.log(JSON.stringify({passed:checks.length,counts,frames:manifest.shots.reduce((n,s)=>n+s.frames.length,0),retired_drafts:retired.files.length},null,2));
