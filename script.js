// Load companies data

function getCompanies(){
    fetch('companies.json')
    .then(compRes => compRes.json())
    .then(compRespond => companiesDisplay(compRespond))
}
getCompanies()


 // Create a table
 
function companiesDisplay(compData) {
    let output = '';
    compData.forEach(function(company){
        output += 
            `
                <tr>
                    <td>${company.name}</td>
                    <td>${company.code}</td>
                    <td>${company.domain}</td>
                </tr>
            `
        ;
    });
    document.getElementById('output').innerHTML = output;
}


// Clear table as preparation to filtering
