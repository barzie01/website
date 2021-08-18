"use strict";
const customersPath = './customers.json';
const companiesPath = './companies.json';
const table = document.getElementById('output');
const input = document.getElementById('textInput');
const btn = document.getElementById('btn');
const phoneInput = document.getElementById('numberInput');
const phoneBtn = document.getElementById('verifyBtn');
let companiesAndCustomers = {};

// Load data from JSON files and display as a table


const loadData = async () => {
    const customersResponse = await fetch(customersPath);
    const companiesResponse = await fetch(companiesPath);
    const companies = await companiesResponse.json();
    const customers = await customersResponse.json();

    return {companies, customers} 
} 

const getData = async () => {
    companiesAndCustomers = {... await loadData()};
    createTable(companiesAndCustomers.companies);
    mergeData(companiesAndCustomers);
    alert("Application ready to use")
}
getData()

// Create table with companies

function createTable(companies) {
    let output = '';
    companies.forEach(function(company){
        output += 
        `
            <tr>
                <td>${company.name}</td>
                <td>${company.code}</td>
                <td>${company.domain}</td>
            </tr>
        ` 
    });
    table.innerHTML = output;
} 

// Implement table filter

 function filterCompany (e) {
    const companies = companiesAndCustomers.companies;
    const inputValue = e.target.value;
    table.innerHTML = '';

    table.innerHTML = companies.reduce((tableHtml, company) => {
        if(!company.name.toLowerCase().includes(inputValue.toLowerCase())) return tableHtml
        tableHtml += `
                <tr>
                    <td>${company.name}</td>
                    <td>${company.code}</td>
                    <td>${company.domain}</td>
                </tr>
            ` 
        return tableHtml
    }, '')
}
input.addEventListener('input', filterCompany);

// Merge customers and companies data

function mergeData() {

    const {companies, customers} = companiesAndCustomers;

    const fileData = customers.map((customer) => {
        return {
            name: customer.name,
            surname: customer.surname,
            email: customer.email,
            companyCode: customer.companyCode,
            company: companies.find((company) => company.code === customer.companyCode
            ),
        }
    });

// Prepare file to download

    const file = new Blob([JSON.stringify(fileData, null, '\t')], {type: 'text/plain'})
    const url = URL.createObjectURL(file);

    function download() {
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', file);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    btn.addEventListener('click', download);
}

// Verify phone number

function verifyNumber() {
    const inputValue = phoneInput.value;
    const regex = /\+\d{1,4}(\-\d{3}){3}$/;
    const alertMessage = regex.test(inputValue) ? 'Correct phone number' : 'Incorrect phone number!'
        alert(alertMessage)
    
}
phoneBtn.addEventListener('click', verifyNumber)