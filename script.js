"use strict";
const customersPath = './customers.json';
const companiesPath = './companies.json';
const table = document.getElementById('output');
const input = document.getElementById('textInput');
const btn = document.getElementById('btn');
const phoneInput = document.getElementById('numberInput');
const phoneBtn = document.getElementById('verifyBtn');
let dataObject = {};

// Load data from JSON files and display as a table


const loadData = async () => {
    const customersResponse = await fetch(customersPath);
    const companiesResponse = await fetch(companiesPath);
    const companies = await companiesResponse.json();
    const customers = await customersResponse.json();

    return {companies, customers} 
} 

const getData = async () => {
    dataObject = {... await loadData()};
    createTable(dataObject.companies);
    mergeData(dataObject);
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
        ` 
    });
    table.innerHTML = output;
} 

// Implement table filter

 function filterCompany (e) {
    const companies = dataObject.companies;
    const inputValue = e.target.value;
    table.innerHTML = '';
    let output = '';

    companies.forEach((company) => {
        if(company.name.toLowerCase().includes(inputValue.toLowerCase())) {
            output += 
        `
            <tr>
                <td>${company.name}</td>
                <td>${company.code}</td>
                <td>${company.domain}</td>
        ` 
    table.innerHTML = output;
        }
    });
}
input.addEventListener('input', filterCompany);

// Merge customers and companies data

function mergeData() {
    const customers = dataObject.customers;
    const companies = dataObject.companies;
    let fileData = [];

    fileData = customers.map((customer) => {
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
    if(regex.test(inputValue)) {
        alert('Correct phone number')
    } else {
        alert('Incorrect phone number!')
    }
}
phoneBtn.addEventListener('click', verifyNumber)