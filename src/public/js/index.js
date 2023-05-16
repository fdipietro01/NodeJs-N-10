console.log("indexJs");
const port = 8081;
//AGREGAR PRODUCTO
const productForm = document.getElementById("form");
productForm?.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  const body = {};
  const inputsForms = Array.from(productForm.elements);
  let emptyValue;
  inputsForms.forEach(({ name: field, value }, index) => {
    if (index !== inputsForms.length - 1) {
      if (!value) emptyValue = true;
      body[field] = value;
    }
  });
  if (emptyValue) {
    window.alert("Ingrese todos los campos");
    return;
  }
  const url = `http://localhost:${port}/api/productos/`;
  const data = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const { redirectUrl, message } = await data.json();
  if (data.status === 200) {
    window.location.href = redirectUrl;
  } else {
    window.location.href = `${redirectUrl}/${message}`;
  }
});

//ELIMINAR PRODUCTO
const deleteItem = async (item) => {
  const data = await fetch(`http://localhost:${port}/api/productos/${item}`, {
    method: "DELETE",
  });
  const { redirectUrl, message } = await data.json();
  if (data.status === 200) {
    window.location.href = redirectUrl;
  } else {
    window.location.href = `${redirectUrl}/${message}`;
  }
};

//CREAR CARRITO
const newCartForm = document.getElementById("newCart");
newCartForm?.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  const data = await fetch(`http://localhost:${port}/api/carts/`, {
    method: "POST",
  });
  const parsedData = await data.json();
  alert(`Carrito creado. Número identificador: ${parsedData.id}`);
});

//BUSCAR CARRITO POR ID
const searchForm = document.getElementById("searchCart");
searchForm?.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  const id = searchForm.elements["cartId"].value;
  if (!id) {
    window.alert("Ingrese un id");
    return;
  }
  const data = await fetch(`http://localhost:${port}/api/carts/${id}`);
  if (data.status === 200) {
    window.location.href = `http://localhost:${port}/api/carts/${id}`;
  } else {
    window.alert("Algo salio mal, reintentar por favor");
  }
});
