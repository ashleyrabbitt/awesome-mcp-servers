import business from './business.mjs';
import research from './research.mjs';
import creative from './creative.mjs';
import builder from './builder.mjs';
import campaign from './campaign.mjs';

export const taskProducts = [...business,...research,...creative,...builder,...campaign].map(product=>({
  ...product, status:'Documentation reviewed', tested:false, date:'2026-11-21',
  directory_updated_at:'2026-11-21', pricing_checked_at:'2026-11-21',
  limitations:product.checkpoint, tag:product.category, color:'sage',
  mark:product.name.split(/\s+/).slice(0,2).map(word=>word[0]).join('').toUpperCase()
}));
