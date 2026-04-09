let budget = localStorage.getItem("budget") || 0;
let target = localStorage.getItem("target") || 0;
let data = JSON.parse(localStorage.getItem("data")) || [];

let chart;

function setBudget() {
    budget = document.getElementById("budget").value;
    localStorage.setItem("budget", budget);
    render();
}

function setTarget() {
    target = document.getElementById("target").value;
    localStorage.setItem("target", target);
    render();
}

function tambah() {
    let nama = document.getElementById("nama").value;
    let jumlah = parseInt(document.getElementById("jumlah").value);

    if (!nama || !jumlah) {
        alert("Isi dulu!");
        return;
    }

    data.push({ nama, jumlah });
    localStorage.setItem("data", JSON.stringify(data));

    render();
}

function hapus(index) {
    if (confirm("Yakin mau hapus?")) {
        data.splice(index, 1);
        localStorage.setItem("data", JSON.stringify(data));
        render();
    }
}

function render() {
    let total = parseInt(budget) || 0;
    let pakai = 0;

    let list = document.getElementById("list");
    list.innerHTML = "";

    let labels = [];
    let values = [];

    data.forEach((item, index) => {
        pakai += item.jumlah;

        labels.push(item.nama);
        values.push(item.jumlah);

        let li = document.createElement("li");
        li.innerHTML = `
            ${item.nama} - Rp ${item.jumlah}
            <span onclick="hapus(${index})" style="color:red; cursor:pointer;">❌</span>
        `;
        list.appendChild(li);
    });

    let sisa = total - pakai;
    let tabungan = sisa > 0 ? sisa : 0;

    document.getElementById("total").innerText = total;
    document.getElementById("pakai").innerText = pakai;
    document.getElementById("sisa").innerText = sisa;
    document.getElementById("tabungan").innerText = tabungan;

    // Progress target
    let persen = target ? (tabungan / target) * 100 : 0;
    document.getElementById("progress").style.width = persen + "%";

    // Grafik
    if (chart) chart.destroy();

    let ctx = document.getElementById("chart").getContext("2d");
    chart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: labels,
            datasets: [{
                data: values
            }]
        }
    });
}

render();