export const createGetAllQuery = ({
  tableName,
  fieldList,
  page_number,
  page_limit,
  search_string,
  condition,
  notCondition,
  isCondition,
  search_variables,
  order,
  filter,
}) => {
  let query = `supabase.from('${tableName}').select('${fieldList.join(",")}')`;
  if (condition) {
    query = `${query}.match({${condition}})`;
  }
  if (search_string) {
    if (search_variables) {
      query = `${query}.ilike('${search_variables}', '%${search_string}%')`;
    } else query = `${query}.ilike('name', '%${search_string}%')`;
  }
  if (notCondition) {
    query = `${query}.not(${notCondition})`;
  }
  if (isCondition) {
    query = `${query}.is(${isCondition})`;
  }
  if (order) {
    query = `${query}.order(${order})`;
  }

  if (filter) {
    query = `${query}.filter(${filter})`;
  }
  query = `${query}.range(${(page_number - 1) * page_limit}, ${
    page_limit - 1
  })`;
  return query;
};

export const createGetOneQuery = (tableName, fieldList, matchCondition) => {
  let query = `supabase.from('${tableName}').select('${fieldList.join(
    ","
  )}').match({${matchCondition}})`;
  return query;
};

export const createDeleteQuery = (
  tableName,
  matchCondition,
  softDelete = true
) => {
  if (softDelete) {
    let query = `supabase.from('${tableName}').update([{is_deleted:true}]).match({${matchCondition}});`;
    return query;
  } else {
    let query = `supabase.from('${tableName}').delete().match({${matchCondition}});`;
    return query;
  }
};

export const createCreateQuery = (tableName, data) => {
  let query = `supabase.from('${tableName}').insert([${JSON.stringify(data)}])`;

  return query;
};

export const createUpdateQuery = (tableName, matchCondition, data) => {
  let query = `supabase.from('${tableName}').update([${JSON.stringify(
    data
  )}]).match({${matchCondition}})`;
  return query;
};

// export const createRPCQuery = (functionName, data) => {
//   let query = `supabase.rpc('${functionName}',${JSON.stringify(data)})`;
//   return query;
// };

export const createRPCQuery = (functionName, data) => {
  let query = `supabase.rpc('${functionName}',${data})`;
  query.replace(/\\/g, "");

  return query;
};
