fetch("http://localhost:5000/data_provider/records/arbo").then(
    (response) => response.json()
).then((data) => {
    console.log(data)
})