import { ROCrate } from 'ro-crate';
import { LdacProfile } from './lib/profile';
export function validate(crateContents) {
  const opt = { alwaysAsArray: true, link: true };
  const crate = new ROCrate(crateContents, opt);
  return LdacProfile.validate(crate);
}
