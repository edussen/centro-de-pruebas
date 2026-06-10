const app = document.getElementById("app");

function matchRoute(pattern, path) {

    const patternParts = pattern.split("/");
    const pathParts = path.split("/");

    if (patternParts.length !== pathParts.length) {
        return null;
    }

    const params = {};

    for (let i = 0; i < patternParts.length; i++) {

        if (patternParts[i].startsWith(":")) {

            params[
                patternParts[i].replace(":", "")
            ] = pathParts[i];

            continue;
        }

        if (patternParts[i] !== pathParts[i]) {
            return null;
        }
    }

    return params;
}

const routes = [

    {
        path: "/",
        render() {

            app.innerHTML = `
                <h2>Inicio</h2>
            `;
        }
    },

    {
        path: "/warehouse/inventory/:id/view",
        render(params) {

            app.innerHTML = `
                <h2>Ver Inventario</h2>

                <p>
                    ID:
                    <strong>${params.id}</strong>
                </p>

                <p>
                    Aquí cargarías los datos desde la API.
                </p>
            `;
        }
    },

    {
        path: "/warehouse/inventory/:id/edit",
        render(params) {

            app.innerHTML = `
                <h2>Editar Inventario</h2>

                <p>
                    ID:
                    <strong>${params.id}</strong>
                </p>

                <input
                    type="text"
                    value="Producto Demo"
                >

                <br><br>

                <button>
                    Guardar
                </button>
            `;
        }
    }

];

function renderRoute() {

    const pathname = window.location.pathname;

    console.log("URL ACTUAL:", pathname);

    for (const route of routes) {

        console.log("PROBANDO:", route.path);

        const params = matchRoute(
            route.path,
            pathname
        );

        console.log("RESULTADO:", params);

        if (params !== null) {

            console.log("MATCH ENCONTRADO");

            route.render(params);

            return;
        }
    }

    console.log("NO SE ENCONTRO RUTA");

    app.innerHTML = `
        <h2>404</h2>
        <p>Ruta no encontrada</p>
    `;
}

function navigate(url) {

    history.pushState(
        {},
        "",
        url
    );

    renderRoute();
}

window.openView = (id) => {

    navigate(
        `/warehouse/inventory/${id}/view`
    );

};

window.openEdit = (id) => {

    navigate(
        `/warehouse/inventory/${id}/edit`
    );

};

window.addEventListener(
    "popstate",
    renderRoute
);

renderRoute();
