

// api requests below

async function apiCall(url, method = 'get', data = {}) {
    method = method.toLowerCase()
    let settings = { method }

    // for formData we must NOT set content-type, let system do it
    const isFormData = (typeof data) === 'string'
    if (!isFormData) {
        settings.headers = { 'Content-Type': 'application/json' }
    }

    // only attach the body for put/post
    if (method === 'post' || method === 'put') {
        if (isFormData) {
            //* gather form data (esp. if attached media)
            //! each entry to be attached must have a valid **name** attribute
            settings.body = new FormData(document.querySelector(`${data}`))
        } else {
            settings.body = JSON.stringify(data)
        }
    }

    const result = await fetch(url, settings).then(res => res.json())

    return result
}