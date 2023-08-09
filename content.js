var $rows = document.querySelector('.ag-center-cols-container').querySelectorAll('[role="row"]');

if ($rows != undefined) {
    if ($rows[0].querySelector('[col-id="sales"]') != undefined) {
        // stored in chrome.storage.
        chrome.storage.sync.get({ targetACOS: '25' },
            (items) => {
                document.querySelectorAll('.target-acos').forEach(e => e.remove());

                var targetACOS = parseFloat(items.targetACOS) / 100;
                var $bidHeader = document.querySelector('[data-e2e-id="kpiElement_acos"]').querySelector('p');
                var $span = document.createElement("span");
                $span.className = "target-acos";
                $span.style.color = "red";
                $span.innerText = ` / ${items.targetACOS}%`;
                var $small = document.createElement("small");
                $small.innerText = "TARGET";
                $small.className = "target-acos";

                $bidHeader.append($span)                
                $bidHeader.append($small)                
                $bidHeader.style.lineHeight = "1.5em";

                for (let i = 0; i < $rows.length; i++) {
                    var $row = $rows[i];
                    var sales = parseFloat($row.querySelector('[col-id="sales"]').innerText.slice(1, -1).replace(",", ""));
                    var clicks = parseFloat($row.querySelector('[col-id="clicks"]').innerText);
                    var targetSpend = sales * targetACOS;
                    var recBid = targetSpend / clicks

                    if (!isNaN(recBid)) {
                        var $cpc = $row.querySelector('[col-id="cpc"]').querySelector('.cell-renderer-main-content');
                        var $div = document.createElement("div");
                        $div.className = "target-acos";
                        $div.style.color = "red";
                        $div.innerText = "Bid: $" + recBid.toFixed(2);
                        $cpc.append($div)
                    }

                    console.log(`targetACOS: ${targetACOS}, sales: ${sales}, clicks: ${clicks}, targetSpend: ${targetSpend.toFixed(2)}, recBid: ${recBid.toFixed(2)}`);
                }
            }
        );
    } else {
        alert('Please scroll over until the SPEND and CLICKS are visible on the page;')
    }
} else {
    alert('Please scroll so the bid table is visible');
}