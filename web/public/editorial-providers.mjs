// Curated from each provider’s public service page. The submission queue is separate.
export const editorialProviders = [
  {
    id: 'credo-ai-advisory', name: 'Credo AI Advisory', kind: 'Advisory service', category: 'Security & governance',
    description: 'Helps organizations design and operate AI governance programs. Bring an inventory of AI use cases and ask how responsibilities, evidence and reviews would work for one of them.',
    audience: 'Risk, compliance and AI program leaders', website: 'https://www.credo.ai/advisory'
  },
  {
    id: 'dept', name: 'DEPT®', kind: 'AI agency', category: 'Marketing & content',
    description: 'Combines creative production, media and AI-assisted content adaptation. A useful brief is one approved campaign that needs versions for different markets or channels.',
    audience: 'Brand and marketing teams running multichannel campaigns', website: 'https://www.dept.global/solutions/brand-media/'
  },
  {
    id: 'hatchworks-ai', name: 'HatchWorks AI', kind: 'Consultancy', category: 'AI strategy & consulting',
    description: 'Offers AI strategy, software development and change management. Bring a process your team already runs and ask how they would choose a pilot, build it and help staff adopt it.',
    audience: 'Technology and operations leaders planning an implementation', website: 'https://hatchworks.com/your-services/'
  },
  {
    id: 'ninetwothree', name: 'NineTwoThree AI Studio', kind: 'AI agency', category: 'Product & research',
    description: 'Works with product teams on AI consulting, product development and custom software. Bring a customer problem and ask what prototype would give your team enough evidence to fund a build.',
    audience: 'Product owners exploring a new AI capability', website: 'https://www.ninetwothree.co/services'
  },
  {
    id: 'section-ai', name: 'Section AI', kind: 'Training provider', category: 'Training & workshops',
    description: 'Offers enterprise AI training and adoption support. Ask how the team will practice a recurring task, get feedback and demonstrate that they can repeat it independently.',
    audience: 'Learning leaders and teams building AI skills across roles', website: 'https://www.sectionai.com/'
  },
  {
    id: 'slalom', name: 'Slalom', kind: 'Consultancy', category: 'AI strategy & consulting',
    description: 'Offers AI consulting from business strategy through implementation. Bring a process that crosses departments and ask how the delivery team will establish ownership and measure change.',
    audience: 'Organizations coordinating AI work across business and technology teams', website: 'https://www.slalom.com/us/en/services/artificial-intelligence'
  },
  {
    id: 'superside', name: 'Superside', kind: 'Creative service provider', category: 'Design & creative',
    description: 'Provides AI-assisted creative production across design, imagery and video. Send a brand reference and one campaign brief to discuss art direction, asset rights and editable deliverables.',
    audience: 'Creative teams extending their production capacity', website: 'https://www.superside.com/ai-creative'
  },
  {
    id: 'thoughtworks', name: 'Thoughtworks', kind: 'Technology consultancy', category: 'Development & MCP',
    description: 'Helps enterprises build and govern AI-enabled software. Ask for an example of how a team moves a working prototype into an application with evaluation, monitoring and a maintenance owner.',
    audience: 'Engineering and platform teams bringing AI into production', website: 'https://www.thoughtworks.com/en-us/what-we-do/enterprise-ai'
  },
  {
    id: 'waymaker-agency', name: 'Waymaker Agency', kind: 'AI agency', category: 'Training & workshops',
    description: 'Offers hands-on AI training and scoped implementation for business teams. Bring a recurring task such as drafting a client brief or preparing a weekly report, and discuss the workflow your team wants to take home.',
    audience: 'Small businesses, marketers, product teams and designers', location: 'West Palm Beach, Florida', website: 'https://agency.waymaker.cx/ai-training-west-palm-beach',
    relationship: 'Waymaker operates both this agency and AI Superpower.'
  },
  {
    id: 'xray', name: 'XRAY', kind: 'Automation consultancy', category: 'Automation & integrations',
    description: 'Designs and implements workflows using automation and AI. A practical first brief is one handoff between tools, with examples of normal requests and exceptions the team must route to a person.',
    audience: 'Growing businesses and operations teams', website: 'https://www.xray.tech/xray-monthly'
  }
].map(provider => ({...provider, editorial: true, reviewed_at: '2026-11-17'}));

const host = value => {
  try { return new URL(value).hostname.toLowerCase().replace(/^www\./, ''); }
  catch { return ''; }
};

// Keep a claimed or accepted community record and its stable ID when a provider also has an editorial profile.
export function publishedServices(community) {
  const identity = provider => host(provider.website) + '|' + provider.name.trim().toLowerCase();
  const profiles = new Map(editorialProviders.map(provider => [identity(provider), provider]));
  const claimed = community.map(provider => {
    const key = identity(provider);
    const profile = profiles.get(key);
    profiles.delete(key);
    return profile ? {...profile, ...provider, editorial: false, relationship: profile.relationship} : provider;
  });
  return [...claimed, ...profiles.values()].sort((a, b) => a.name.localeCompare(b.name));
}
