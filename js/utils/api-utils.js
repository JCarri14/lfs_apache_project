export async function request({ url, method, headers, body }) {
    
    try {
        const res = await fetch(url, {
            method: method,
            headers: { ...headers},
            body: body
        });

        const jsonData = await res.json();
        
        return {
            isSuccessful: true,
            data: jsonData,
            error: null
        }

    } catch(err) {
        return {
            isSuccessful: false,
            data: null,
            error: err
        }
    }
}