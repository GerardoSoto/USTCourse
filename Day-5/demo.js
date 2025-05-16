const submitBtn = document.getElementById("submit");
const refreshBtn = document.getElementById("refresh");
const $form = document.getElementById('form');
const table = document.getElementById('myDataTable');
// const thead = table.querySelector('thead tr'); // Get the table header row - dynamically
// const tbody = table.querySelector('tbody');   // Get the table body - dynamically

const formData = {};
const API_URL = "http://localhost:3000/products";

let editId = null;

submitBtn.addEventListener("click", async function () {

  //validations
  const productInput = document.getElementById('product');
  const product = productInput.value.trim();
  if (!product) return alert("Enter a product name");

  const priceInput = document.getElementById('price');
  const price = priceInput.value.trim();
  if (!price) return alert("Enter a product name");

  //exctract the information
  for (let i = 0; i < $form.elements.length; i++) {
    const element = $form.elements[i];

    if (element.name) {
      formData[element.name] = element.value;
    }
  }
  let bodyFormJson = JSON.stringify(formData);

  const method = editId ? 'PUT' : 'POST';
  const url = editId ? `${API_URL}/${editId}` : API_URL;

  //SAVE DATA TO JSON SERVER
  const options = {
    method: method, // or 'PUT', 'DELETE'
    headers: {
      'Content-Type': 'application/json'
      // Add any other headers here
    },
    body: bodyFormJson


  };

  await fetch(url, options)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(responseData => {
      // Process the response data
      console.log(responseData);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });

  fetchProducts();
})

function startEdit(id, product, price) {
  document.getElementById('product').value = product;
  document.getElementById('price').value = price;
  editId = id;
}


async function fetchProducts() {
  //const res = await fetch(API_URL + '?_limit=5');
  const res = await fetch(API_URL);
  const items = await res.json();
  const list = document.getElementById("myDataTable");
  list.innerHTML = '';
  items.forEach(item => {
    list.innerHTML += `
        <tr>
          <td>${item.id}</td>
          <td>${item.Product}</td>
          <td>${item.Price}</td>
          <td>
           <button class=" btn btn-warning delete" onclick="startEdit('${item.id}','${item.Product.replace(/'/g, "\\'")}',${item.Price})">
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
             <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/></svg>
            </button>
                        
            
           <button class=" btn btn-danger delete" onclick="deleteProduct('${item.id}')">
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
             <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/></svg>
           </button>
                          
                         
          </td>
        </tr>
      `;
  });
}

async function deleteProduct(id) {
  const confirmed = confirm("Are you sure you want to delete?");
  if (!confirmed) return;

  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  alert('Post deleted!');
 fetchProducts();
}


//alternative way - dynamically
async function fetchData() {
  await fetch(API_URL)
    .then(response => {
      if (!response.ok) {
        console.log("not possible no get the data")
      }
      return response.json();
    })
    .then(data => {
      populateTable(data);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error)
    })
}

//alternative way - dynamically
async function populateTable(data) {

  tbody.innerHTML = '';
  thead.innerHTML = '';

  if (!data || data.length === 0) {
    const noDataRow = tbody.insertRow();
    const noDataCell = noDataRow.insertCell();
    noDataCell.textContent = 'No data available.';
    noDataCell.colSpan = thead.cells.length || 1;
    return;
  }

  //Asume we have at least one item in the JSON
  const firstItem = data[0];

  if (firstItem) {
    for (const key in firstItem) {
      if (firstItem.hasOwnProperty(key)) {
        const th = document.createElement('th');
        th.textContent = key.charAt(0).toUpperCase() + key.slice(1); // Capitalize first letter
        thead.appendChild(th);
      }
    }
    const th = document.createElement('th');
    th.textContent = "Action";
    thead.appendChild(th);
  }

  // Create table rows and cells for each data item
  data.forEach(item => {
    const row = tbody.insertRow();
    for (const key in item) {
      if (item.hasOwnProperty(key)) {
        const cell = row.insertCell();
        cell.textContent = item[key];
      }
    }
    const cell = row.insertCell();
    cell.innerHTML = `
                          <button class=" btn btn-danger delete" onclick="deleteProduct('${item.id}')">
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                           <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                           </svg>
                          </button>
                          
                          <button class=" btn btn-warning delete" onclick="startEdit('${item.id}','${item.Product}',${item.Price})">
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                           <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/></svg>
                          </button>
                        `;
  });
}


