function paramURL(obj = {}) {
  if (Object.keys(obj).length == 0) {
    return ""
  }
  const param = Object.entries(obj).map(([key, value]) => {
    return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
  })
  return "?" + param.join("&")
}

async function fetchData(method, path, body = {}, param) {
  const token = localStorage.getItem("token")
  param = paramURL(param)
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  }
  if(Object.keys(body).length != 0) options.body = JSON.stringify(body)
  const data = await fetch('http://localhost:3000/api' + path + param, options)
    .then(res => res.json())
  return data
}
export default fetchData