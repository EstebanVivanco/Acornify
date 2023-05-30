class c_navbar extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.innerHTML = `
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container px-4 px-lg-5">
            <img src="/bellota.png" height="23px" style="padding-right: 1%;" alt="">
            <a class="navbar-brand" href="#!">Acornify</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                    <li class="nav-item"><a class="nav-link active" href="/vista_catalogo">Tiendas</a></li>
                    <li class="nav-item"><a class="nav-link active" href="/vista_historial">Historial</a></li>
                </ul>
            </div>
        </div>
    </nav>
        `;
    }
}

window.customElements.define("c-navbar", c_navbar);

