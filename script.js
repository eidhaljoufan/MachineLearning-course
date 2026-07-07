document.addEventListener("DOMContentLoaded", () => {
    const isiContainer = document.querySelector(".isi");
    const homeContent = isiContainer.innerHTML;

    function loadMateri(file) {
        const url = `${file}?v=${Date.now()}`;

        fetch(url, { cache: "no-store" })
            .then(res => {
                if (!res.ok) throw new Error("File kaga ada, cek path-nya!");
                return res.text();
            })
            .then(html => {
                isiContainer.innerHTML = html;
                isiContainer.scrollTop = 0;
            })
            .catch(err => {
                isiContainer.innerHTML = `
                    <div style="text-align:center; padding: 2rem;">
                        <h2 style="color: #ffde57;">Waduh!</h2>
                        <p>${err.message}</p>
                    </div>`;
            });
    }

    const links = document.querySelectorAll(".pertemuan a[data-file], .pertemuan a#home");
    
    links.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            
            const file = link.getAttribute("data-file");

            if (link.id === "home") {
                isiContainer.innerHTML = homeContent;
            } else if (file) {
                loadMateri(file);
            }
        });
    });
});
