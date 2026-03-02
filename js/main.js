const navbar_container = document.getElementById("navbar_container")
const navbar_container_index = document.getElementById("navbar_container_index")


if(navbar_container_index){
    navbar_container_index.innerHTML= `<div class="container-fluid" id="navbar_container">
            <div class="row">
                <nav class="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
                    <div class="container-fluid ">
                        <a class="navbar-brand" href="#inicio">
                            <img src="./media/logo.png" alt="" class="nav-icon">
                        </a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div class="navbar-nav">
                                <a class="nav-link" aria-current="page" href="#inicio">Inicio</a>
                                <a class="nav-link" href="#skills">Habilidades</a>
                                <a class="nav-link" href="#projects">Proyectos</a>
                                <a class="nav-link" href="#">Cursos</a>
                                <a class="nav-link" href="#">Contacto</a>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>`;
}
