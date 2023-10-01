function openPopup() {
    // Create a popup container
    const popupContainer = document.createElement('div');
    popupContainer.id = 'popupContainer';
    document.body.appendChild(popupContainer);

    const popupStyles = `
        .popup {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 80%;
            max-width: 500px;
            background-color: #fff;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        }

        .popup .close-circle {
            position: fixed;
            top: 10px;
            right: 10px;
            cursor: pointer;
        }

        /* Add other styles here */

        /* ... */

    `;

    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = popupStyles;
    document.head.appendChild(styleSheet);

    const popupHtml = `
    <div class="popup">
        <div class="frame">
            <img class="close-circle" src="../images/close.svg" onclick="closePopup()" />
            <div class="div">
                <img class="success-kite" src="../images/kite.svg" />
                <p class="your-video-link-has">
                    <span class="text-wrapper">Your video link has been sent to </span>
                    <span class="span">johnmark@gmail.com</span>
                </p>
            </div>
        </div>
        <div class="frame">
            <div class="div">
                <p class="text-wrapper">Would you need to view this video later? Save to your account now!</p>
                <div class="frame-wrapper">
                    <div class="div-wrapper">
                        <div class="div-wrapper-2"><div class="text-wrapper-2">Save Video</div></div>
                    </div>
                </div>
            </div>
            <p class="don-t-have-an">
                <span class="span">Don’t have an account?</span>
                <span class="text-wrapper-3">&nbsp;</span>
                <span class="text-wrapper-4">Create account</span>
            </p>
        </div>
    </div>
    `;

    const popupWindow = document.createElement('div');
    popupWindow.classList.add('popup');
    popupWindow.innerHTML = popupHtml;
    popupContainer.appendChild(popupWindow);

    // Center the popup on the page
    const centerPopup = () => {
        const windowHeight = window.innerHeight;
        const popupHeight = popupWindow.offsetHeight;
        popupWindow.style.top = `${(windowHeight - popupHeight) / 2}px`;
    };

    // Center the popup initially and on window resize
    centerPopup();
    window.addEventListener('resize', centerPopup);
}

function closePopup() {
    const popupContainer = document.getElementById('popupContainer');
    if (popupContainer) {
        popupContainer.remove();
    }
}
