// simple wrapper around fetch to give session & do the JSON after 
function get( url ){
    return fetch( url, 
        { headers: { 'Session': localStorage.session ? localStorage.session : '' } })
        .then( result=>result.json() )
}

function post( url, data ){
    console.log(`[in API post] url `, url)
    console.log(`[in API post] data `, JSON.stringify(data))
    return fetch( url, 
        {   method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Session': localStorage.session ? localStorage.session : ''
            },
            body: JSON.stringify(data)
        }).then( result=>result.json())
}

export default {
    get,
    post
}
