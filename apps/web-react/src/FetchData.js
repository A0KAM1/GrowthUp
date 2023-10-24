async function fetchData(method, path, body){
    const token = localStorage.getItem("token")
    const data = await fetch('http://localhost:3000/api' + path, {
            method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
              },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            return data
}
export default fetchData