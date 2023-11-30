document.getElementById("registroForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const email = document.getElementById("email").value;
    const pais = document.getElementById("pais").value;
    const ocupacion = document.getElementById("ocupacion").value;
    const interes = document.getElementById("interes").value;
    try {
        const response = await fetch('/', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, apellido, email, pais, ocupacion, interes }),
        });

        const data = await response.json();
        
        if (response.ok) {
            console.log(nombre, apellido, email, pais, ocupacion, interes, data.body);
        } else {
            console.error('Error:', response.statusText)
        }
    } catch (err) {
        console.log("Error catch: ", err);
    }

})