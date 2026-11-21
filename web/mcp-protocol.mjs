export const protocols = ['2025-11-25', '2025-06-18', '2025-03-26'];
const error = (id, code, message) => ({jsonrpc: '2.0', id, error: {code, message}});
export const object = value => value !== null && typeof value === 'object' && !Array.isArray(value);

function validArguments(schema, args) {
  if (!object(args) || (schema.required || []).some(key => !Object.hasOwn(args, key))) return false;
  return Object.entries(args).every(([key, value]) => {
    if (!Object.hasOwn(schema.properties, key)) return false;
    const rule = schema.properties[key];
    if (rule.enum && !rule.enum.includes(value)) return false;
    if (rule.type === 'string') return typeof value === 'string' && value.trim().length >= (rule.minLength ?? 0) && value.length <= (rule.maxLength ?? 200);
    if (rule.type === 'integer') return Number.isSafeInteger(value) && value >= (rule.minimum ?? 0) && value <= (rule.maximum ?? 100);
    if (rule.type === 'number') return Number.isFinite(value) && value >= (rule.minimum ?? 0) && value <= (rule.maximum ?? 1e8);
    return rule.type === 'boolean' && typeof value === 'boolean';
  });
}

export async function dispatch(message, server, tools) {
  if (!object(message) || message.jsonrpc !== '2.0' || typeof message.method !== 'string')
    return error(null, -32600, 'Invalid JSON-RPC request.');
  if (!Object.hasOwn(message, 'id')) return null;
  const {id, method, params = {}} = message;
  if (typeof id !== 'string' && !Number.isSafeInteger(id)) return error(null, -32600, 'Invalid request ID.');
  if (!object(params)) return error(id, -32602, 'Expected an object for params.');
  let result;
  if (method === 'initialize') {
    if (typeof params.protocolVersion !== 'string' || !object(params.capabilities) || !object(params.clientInfo))
      return error(id, -32602, 'Supply clientInfo, capabilities and protocolVersion.');
    result = {protocolVersion: protocols.includes(params.protocolVersion) ? params.protocolVersion : protocols[0],
      capabilities: {tools: {}}, serverInfo: server};
  } else if (method === 'ping') result = {};
  else if (method === 'tools/list') result = {tools: tools.map(({run, ...definition}) => definition)};
  else if (method === 'tools/call') {
    const tool = tools.find(x => x.name === params.name);
    if (!tool) return error(id, -32602, 'Unknown tool.');
    const args = Object.hasOwn(params, 'arguments') ? params.arguments : {};
    if (!validArguments(tool.inputSchema, args)) return error(id, -32602, 'Check argument names, types and limits in tools/list.');
    try {
      const data = await tool.run(args);
      result = {content: [{type:'text',text:JSON.stringify(data)}], structuredContent:data};
    } catch (e) {
      result = {isError:true,content:[{type:'text',text:e instanceof InputError ? e.message : 'The source could not be read. Check access, connectivity and the input file.'}]};
    }
  } else return error(id, -32601, 'Unsupported method.');
  return {jsonrpc:'2.0',id,result};
}

export class InputError extends Error {}
export function tool(name, description, properties, required, run, openWorld = false) {
  return {name, description, inputSchema:{type:'object',properties,required,additionalProperties:false},
    annotations:{readOnlyHint:true,destructiveHint:false,idempotentHint:true,openWorldHint:openWorld},run};
}
