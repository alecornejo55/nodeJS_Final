const cleave = new Cleave('.input-element', {
    phone: true,
    phoneRegionCode: 'ar'
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById("profileForm");
    const btnAction = document.getElementById("btn-save");
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        btnAction.disabled = true;
        const htmlBtnLoading = `
        <span class="mr-1">Actualizando&nbsp;</span>
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        `;
        btnAction.innerHTML = htmlBtnLoading;

        const newForm = new FormData(e.target);

        const response = await fetch(`/api/user/`, {
          method: "PUT",
          body: newForm,
        });
        
        const result = await response.json();
        const divError = document.getElementById("errMsg");
        if(result.status === 'error') {
            divError.innerHTML = "";
            result.message.forEach(element => {
                divError.innerHTML += `<p class="m-0">${element}</p>`;
            });
            divError.className = "alert alert-danger py-3";
            btnAction.innerHTML = "Actualizar datos";
            btnAction.disabled = false;
            // scroll to top
            window.scrollTo(0, 0);
            setTimeout(() => {
                divError.innerHTML = "";
                divError.className = "";
            }, 4000);
        }
        else {
            divError.innerHTML = "";
            divError.className = "";
            // window.location.href = "/login";
        }
    });
});