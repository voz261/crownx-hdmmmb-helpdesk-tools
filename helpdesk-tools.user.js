// ==UserScript==
// @name         Helpdesk Tools
// @namespace    https://github.com/voz261/crownx-hdmmmb-helpdesk-tools
// @version      1.1.6
// @description  tuanna3
// @author       tuanna3
// @match        https://helpdesk.crownx.com.vn/*
// @downloadURL  https://github.com/voz261/crownx-hdmmmb-helpdesk-tools/raw/refs/heads/main/helpdesk-tools.user.js
// @updateURL    https://github.com/voz261/crownx-hdmmmb-helpdesk-tools/raw/refs/heads/main/helpdesk-tools.user.js
// @grant none
// ==/UserScript==

(function () {
'use strict';
let replyWin = null;

(function () {
    const _open = window.open;
    window.open = function (...args) {
        const w = _open.apply(this, args);
        console.log("📌 popup captured:", w);
        replyWin = w;
        return w;
    };
})();

const WEBHOOK_KEY = "discord_webhook";
function getWebhook() {
    let webhook = localStorage.getItem(WEBHOOK_KEY);
    if (!webhook) {
        webhook = prompt("Nhập Discord Webhook:");
        if (!webhook)
            return null;
        webhook = webhook.trim();
        localStorage.setItem(WEBHOOK_KEY, webhook);
    }
    return webhook;
}

async function sendDiscord(desc) {
    const webhook = "https://discord.com/api/webhooks/1522545957374263407/XF9XYYFcvQo2k1Wt699H1OT4CNJd_TV9WIotp-a0asLXZFZ27x28wKXL_yqOA_05gTao"; //await getWebhook();
    if (!webhook)
        return;
    try {
        const MAX_LENGTH = 2000;
        let text = desc.innerText
        .split(/from\s*:/i)[0].trim()
        .split("\n")
        .map(line => line.trim())
        .filter(line => line !== "")
        .join("\n");
        if (text.length > MAX_LENGTH) {
            text = text.slice(0, MAX_LENGTH - 20) + "\n...(đã cắt bớt)";
        }
        //console.log(text);
        await fetch(webhook, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: text
            })
        });
    } catch (e) {
        console.error(e);
        alert("Gửi Discord thất bại!");
    }
}
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const $=()=>window.jQuery;
async function waitFor(fn){
    while(true){
        const v=fn();
        if(v) return v;
        await sleep(300);
    }
}

async function setSelect(name, text) {
    const jq = await waitFor(() => window.jQuery);
    while (true) {
        const s = jq(`select[name="${name}"]`);
        if (s.length) {
            const o = s.find("option").filter(function () {
                return jq(this).text().trim().toLowerCase() === text.toLowerCase();
            });
            if (o.length) {
                s.select2("val", o.val()).trigger("change");
                await sleep(300);
                return;
            }
        }
        await sleep(300);
    }
}

async function pickUp(){
    const tech = document.querySelector("#technician-right-panel .form-control-static")?.innerText.trim();
    if (tech != "Không được gán")
        return;
    $req.prop.setRightPanelEdit("pickUp");
    await waitFor(() => {
        const t = document.querySelector("#technician-right-panel .form-control-static");
        return t && t.innerText.trim() != "Không được gán";
    });
}

async function autoClose(sub) {
    try {
        await sleep(1000);
        await pickUp();
        $req.prop.sectionalFieldsEdit();
        await setSelect("group", "1 IT-HelpdeskMB");
        await setSelect("category", "1.1.Hạ tầng - Helpdesk");
        await setSelect("subcategory", sub);
        await setSelect("status", "7 Closed");
        $req.prop.inlineSave();
        
        await sleep(1000);
        
        // Tìm nút "Tiếp theo"
        const nextButton = document.querySelector('.li-nav.btn-group a:last-child');
        
        // Kiểm tra nút có tồn tại và không bị disabled
        if (nextButton && !nextButton.hasAttribute('disabled')) {
            console.log('Click vào nút Tiếp theo');
            nextButton.click();
        } else {
            console.log('Nút Tiếp theo bị disable, chuyển về danh sách');
            location.href = "https://helpdesk.crownx.com.vn/WOListView.do";
        }
    } catch (error) {
        console.error("Lỗi trong autoClose:", error);
        // Fallback: chuyển về danh sách nếu có lỗi
        location.href = "https://helpdesk.crownx.com.vn/WOListView.do";
    }
}

async function replyTicket(autoSubmit = false) {
    const clip = await navigator.clipboard.readText();
    document.getElementById("Req_Det_Reply").click();
    const timer = setInterval(() => {
        try {
            const win = replyWin || window.opener || null;
            if (!win) {
                console.log("waiting popup...");
                return;
            }
            const iframe = win.document.querySelector("iframe.ze_area");
            if (!iframe) {
                console.log("waiting editor iframe...");
                return;
            }
            const body = iframe.contentDocument?.body;
            if (!body || body.children.length < 2) {
                console.log("waiting body...");
                return;
            }
            clearInterval(timer);
            const div2 = body.children[2];
            div2.replaceChildren();
            const html = clip
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/\r?\n/g, "<br>")
            .replace(/ {2}/g, "&nbsp;&nbsp;");
            div2.innerHTML = html;

            // Tự động click nút Submit nếu autoSubmit = true
            if (autoSubmit) {
                setTimeout(() => {
                    const submitBtn = win.document.querySelector(
                        'input[type="button"][name="submit1"][value="Gửi"]'
                    );
                    if (submitBtn) {
                        submitBtn.click();
                        console.log("✅ Auto-submit: Clicked Send");
                    } else {
                        console.log("❌ Không tìm thấy nút Gửi");
                    }
                }, 300);
            } else {
                console.log("⏸️ Auto-submit disabled - chờ người dùng click thủ công");
            }
        } catch (e) {
            console.log("ERROR:", e);
        }
    }, 300);
}

async function superFast1Click() {
    // 1. Reply với clipboard (autoSubmit = false để không tự động gửi)
    await replyTicket(true);
    // 2. Đợi reply hoàn tất rồi đóng ticket
    await sleep(3000);
    await autoClose("Dịch vụ Đăng nhập");
}

function button(text,color,click){
    const b=document.createElement("button");
    b.innerHTML=text;
    b.style.cssText=`
        padding:6px 12px;
        border:0;
        border-radius:4px;
        color:#fff;
        cursor:pointer;
        background:${color};
        font-weight:500;
        font-size:12px;
        transition: all 0.2s;
        white-space:nowrap;
        min-width:130px;
    `;
    b.onmouseover = function() {
        this.style.transform = 'scale(1.05)';
        this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    };
    b.onmouseout = function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = 'none';
    };
    b.onclick=click;
    return b;
}

function getEditorInstance() {
    const candidates = [
        window.editor,
        window.editor2,
        window.zeditor
    ];
    for (const ed of candidates) {
        try {
            if (ed && typeof ed.getBody === "function") {
                return ed;
            }
        } catch (e) {}
    }
    return null;
}
async function assignToTuan() {
    $req.prop.sectionalFieldsEdit();
    await setSelect("group","1 IT-HelpdeskMB");
    await setSelect("category","1.1.Hạ tầng - Helpdesk");
    await setSelect("technician", "Nguyễn Anh Tuấn (WM-CNTT-MB)");
    await setSelect("status", "4 OnHold");
    $req.prop.inlineSave();
}
async function assignToVHUD() {
    $req.prop.sectionalFieldsEdit();
    await setSelect("group","1 IT-VHUD");
    await setSelect("category","1.1.Hạ tầng - Helpdesk");
    await setSelect("status", "4 OnHold");
    $req.prop.inlineSave();
}
function addToolbar() {
    try {
        const desc = document.getElementById("desc-content");
        if (!desc || document.getElementById("tm-toolbar"))
            return;

        // Xử lý desc để lấy text và tìm mã nhân viên
        let text = "";
        try {
            if (desc.innerText) {
                text = desc.innerText
                    .split(/from\s*:/i)[0].trim()
                    .split("\n")
                    .map(line => line.trim())
                    .filter(line => line !== "")
                    .join("\n");

                const MAX_LENGTH = 2000;
                if (text.length > MAX_LENGTH) {
                    text = text.slice(0, MAX_LENGTH - 20) + "\n...(đã cắt bớt)";
                }
            }
        } catch {}

        // Kiểm tra có tồn tại mã nhân viên không (chỉ cần 1 là đủ)
       const hasEmployeeIds = /(?<!\d)(0?[36]\d{5,6})(?!\d)/.test(text);

        const container = document.createElement("div");
        container.id = "tm-toolbar";
        container.style.cssText = `
            display:flex;
            flex-direction:column;
            gap:8px;
            margin-top:10px;
            padding:10px 14px;
            background: #f8f9fa;
            border-radius:6px;
            border: 1px solid #e9ecef;
        `;

        // === CỘT 1: Bước đầu ===
        const col1 = document.createElement("div");
        col1.style.cssText = `
            display:flex;
            gap:6px;
            flex-wrap:wrap;
            align-items:center;
        `;
        const label1 = document.createElement("span");
        label1.textContent = "📤 Bước 1:";
        label1.style.cssText = `
            font-size:12px;
            font-weight:600;
            color:#495057;
            margin-right:4px;
            min-width:65px;
        `;
        col1.append(label1);
        col1.append(
            button(
                "Send Discord",
                "#5865F2",
                () => sendDiscord(desc)
            )
        );

        // === CỘT 2: Bước tiếp theo (Reply + Closed + SuperFast) - Chỉ hiện khi có mã NV ===
        const col2 = document.createElement("div");
        col2.style.cssText = `
            display:flex;
            gap:6px;
            flex-wrap:wrap;
            align-items:center;
            padding-top:6px;
            border-top: 1px solid #dee2e6;
        `;
        const label2 = document.createElement("span");
        label2.textContent = "👷 Bước 2:";
        label2.style.cssText = `
            font-size:12px;
            font-weight:600;
            color:#495057;
            margin-right:4px;
            min-width:65px;
        `;
        col2.append(label2);
        col2.append(
            button(
                "Reply (+clipboard)",
                "#ff9800",
                () => replyTicket(false)
            ),
            button(
                "Close (Đăng nhập)",
                "#17a2b8",
                () => autoClose("Dịch vụ Đăng nhập")
            ),
            button(
                "✨1-Click✨ Reply(+clip) ➜Close ➜NextTicket",
                "#d32f2f",
                superFast1Click
            )
        );

        // === CỘT 3: Dịch vụ phát sinh (Assign) - Chỉ hiện khi có mã NV ===
        const col3 = document.createElement("div");
        col3.style.cssText = `
            display:flex;
            gap:6px;
            flex-wrap:wrap;
            align-items:center;
            padding-top:6px;
            border-top: 1px solid #dee2e6;
        `;
        const label3 = document.createElement("span");
        label3.textContent = "🚀 Gán:";
        label3.style.cssText = `
            font-size:12px;
            font-weight:600;
            color:#495057;
            margin-right:4px;
            min-width:65px;
        `;
        col3.append(label3);
        col3.append(
            button(
                "Assign VHUD",
                "#6c757d",
                async () => {
                    const ok = confirm("Gán team VHUD");
                    if (!ok) return;
                    await assignToVHUD();
                }
            ),
            button(
                "Assign Tuanna3",
                "#6c757d",
                async () => {
                    const ok = confirm("⛔ Cảnh báo nguy hiểm 😏");
                    if (!ok) return;
                    await assignToTuan();
                }
            )
        );

        // === CỘT 4: Tool khác (Luôn hiển thị) ===
        const col4 = document.createElement("div");
        col4.style.cssText = `
            display:flex;
            gap:6px;
            flex-wrap:wrap;
            align-items:center;
            padding-top:6px;
            border-top: 1px solid #dee2e6;
        `;
        const label4 = document.createElement("span");
        label4.textContent = "🛠️ Khác:";
        label4.style.cssText = `
            font-size:12px;
            font-weight:600;
            color:#495057;
            margin-right:4px;
            min-width:65px;
        `;
        col4.append(label4);
        col4.append(
            button(
                "Close (Máy tính)",
                "#17a2b8",
                () => autoClose("Dịch vụ Máy tính")
            )
        );
        col4.append(
            button(
                "Close (Đăng nhập)",
                "#17a2b8",
                () => autoClose("Dịch vụ Đăng nhập")
            )
        );
        col4.append(
            button(
                "Close (Cân điện tử)",
                "#17a2b8",
                () => autoClose("Hỗ trợ Cân")
            )
        );
        col4.append(
            button(
                "Close (Đường truyền)",
                "#17a2b8",
                () => autoClose("Đường truyền")
            )
        );

        // Chỉ thêm col1 col2 và col3 nếu có mã nhân viên
        if (hasEmployeeIds) {
            container.append(col1,col2, col3);
        }
        container.append(col4);

        const actions = document.getElementById("desc-section");
        if (actions) {
            actions.insertAdjacentElement("afterend", container);
        }
    } catch (error) {
        console.error("Lỗi trong addToolbar:", error);
        // Không làm gì thêm, chỉ log lỗi để tránh crash
    }
}

setInterval(()=>{

    if(window.jQuery && window.$req)
        addToolbar();

},500);

})();