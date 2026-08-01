// ==============================
// Dashboard Counter Animation
// ==============================

function animateCounter(element, target, suffix = "") {
    let count = 0;
    const step = Math.ceil(target / 80);

    const timer = setInterval(() => {
        count += step;

        if (count >= target) {
            count = target;
            clearInterval(timer);
        }

        element.innerText = count + suffix;

    }, 20);
}

// Animate dashboard numbers
window.onload = function () {

    const cards = document.querySelectorAll(".card h1");

    animateCounter(cards[0], 125);
    animateCounter(cards[1], 24, "K");
    animateCounter(cards[2], 95, "%");

};

// ==============================
// Search Modules
// ==============================

const searchInput = document.querySelector(".search-box input");
const moduleCards = document.querySelectorAll(".module-card");

searchInput.addEventListener("keyup", function () {

    const value = this.value.toLowerCase();

    moduleCards.forEach(card => {

        const title = card.querySelector("h3").innerText.toLowerCase();

        if (title.includes(value)) {

            card.style.display = "block";

        }
        else {

            card.style.display = "none";

        }

    });

});

// ==============================
// Sidebar Category Filter
// ==============================

const categories = document.querySelectorAll(".sidebar li");

categories.forEach(category => {

    category.addEventListener("click", function () {

        const value = this.innerText.toLowerCase();

        moduleCards.forEach(card => {

            const text = card.innerText.toLowerCase();

            if (text.includes(value)) {

                card.style.display = "block";

            }
            else {

                card.style.display = "none";

            }

        });

        showToast(value.toUpperCase() + " Modules Loaded");

    });

});

// ==============================
// View Module
// ==============================

const viewButtons = document.querySelectorAll(".view-btn");

viewButtons.forEach(button => {

    button.addEventListener("click", function () {

        const module = this.parentElement.parentElement.querySelector("h3").innerText;

        alert(
            "Module : " + module +
            "\n\nProvider : AWS" +
            "\nVersion : Latest" +
            "\n\nTerraform Ready"
        );

    });

});

// ==============================
// Configure Module
// ==============================

const configButtons = document.querySelectorAll(".config-btn");

configButtons.forEach(button => {

    button.addEventListener("click", function () {

        let region = prompt("Enter AWS Region", "us-east-1");

        if (region == null) return;

        let instance = prompt("Instance Type", "t3.micro");

        if (instance == null) return;

        alert(
            "Configuration Saved\n\nRegion : "
            + region +
            "\nInstance : "
            + instance
        );

        showToast("Configuration Saved");

    });

});

// ==============================
// Terraform Plan Simulation
// ==============================

const planButtons = document.querySelectorAll(".plan-btn");

planButtons.forEach(button => {

    button.addEventListener("click", function () {

        const terminal = document.getElementById("terminal");

        terminal.innerHTML = `
Terraform v1.7.0

Initializing Provider Plugins...

Reading Modules...

Refreshing Terraform State...

Terraform will perform the following actions:

+ aws_instance.web

+ aws_security_group.default

+ aws_eip.elastic_ip

~ aws_db_instance.database

- aws_instance.old

---------------------------------------

Plan:

3 to add

1 to change

1 to destroy

---------------------------------------

Plan Generated Successfully.
`;

        showToast("Terraform Plan Generated");

    });

});

// ==============================
// Apply Simulation
// ==============================

const applyButtons = document.querySelectorAll(".apply-btn");

applyButtons.forEach(button => {

    button.addEventListener("click", function () {

        if (!confirm("Apply Infrastructure?"))
            return;

        const bar = document.querySelector(".progress-bar");

        const status = document.getElementById("status");

        let progress = 0;

        const steps = [

            "Initializing...",

            "Loading Modules...",

            "Validating Configuration...",

            "Planning Infrastructure...",

            "Creating Resources...",

            "Applying Changes...",

            "Finishing..."

        ];

        let i = 0;

        bar.style.width = "0%";

        const timer = setInterval(() => {

            progress += 15;

            bar.style.width = progress + "%";

            status.innerText = steps[i];

            i++;

            if (progress >= 100) {

                clearInterval(timer);

                bar.style.width = "100%";

                status.innerHTML =
                    "✅ Apply Complete! Resources Created Successfully";

                showToast("Deployment Successful");

            }

        }, 700);

    });

});

// ==============================
// Toast Notification
// ==============================

function showToast(message) {

    const toast = document.createElement("div");

    toast.innerText = message;

    toast.style.position = "fixed";
    toast.style.top = "20px";
    toast.style.right = "20px";
    toast.style.background = "#238636";
    toast.style.color = "white";
    toast.style.padding = "15px";
    toast.style.borderRadius = "10px";
    toast.style.boxShadow = "0 0 10px black";
    toast.style.zIndex = "9999";

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.remove();

    }, 3000);

}

// ==============================
// Highlight Active Sidebar
// ==============================

categories.forEach(item => {

    item.addEventListener("click", function () {

        categories.forEach(li => {

            li.style.background = "#21262d";

        });

        this.style.background = "#238636";

    });

});

// ==============================
// Reset Filter
// ==============================

document.querySelector(".logo").addEventListener("click", function () {

    moduleCards.forEach(card => {

        card.style.display = "block";

    });

    searchInput.value = "";

    showToast("Gallery Reset");

});

// ==============================
// Footer Year
// ==============================

const footer = document.querySelector("footer p");

footer.innerHTML =
    "Terraform IaC Template Gallery © " +
    new Date().getFullYear() +
    " | One-Click Apply Simulation";

// ==============================
// Welcome Message
// ==============================

setTimeout(() => {

    showToast("Welcome to Terraform IaC Template Gallery");

}, 800);