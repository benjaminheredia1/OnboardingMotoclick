// @ts-ignore
import html2pdf from "html2pdf.js"

export function getPdfHtmlTemplate(data: any) {
    // We format arrays or empty data
    const formatValue = (val: any) => {
        if (Array.isArray(val)) return val.length > 0 ? val.join(', ') : 'None';
        return val ? val : 'N/A';
    };

    // Format operating hours from JSON string into a readable HTML table
    const formatOperatingHours = (jsonStr: any) => {
        try {
            const slots = typeof jsonStr === 'string' ? JSON.parse(jsonStr) : jsonStr;
            if (!Array.isArray(slots) || slots.length === 0) return 'N/A';
            let html = `<table class="hours-table">
                <thead><tr><th>Days</th><th>Open</th><th>Close</th><th>Valid Period</th></tr></thead>
                <tbody>`;
            slots.forEach((slot: any) => {
                const days = (slot.days && slot.days.length > 0) ? slot.days.join(', ') : 'No days selected';
                const open = slot.open || '—';
                const close = slot.close || '—';
                let period = '—';
                if (slot.valid_from || slot.valid_to) {
                    const from = slot.valid_from || '...';
                    const to = slot.valid_to || '...';
                    period = `${from} → ${to}`;
                }
                html += `<tr><td>${days}</td><td>${open}</td><td>${close}</td><td>${period}</td></tr>`;
            });
            html += '</tbody></table>';
            return html;
        } catch (e) {
            return formatValue(jsonStr);
        }
    };

    const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <title>Onboarding Document - ${formatValue(data.trade_name)}</title>
    <style>
        @page { size: letter; margin: 1.5cm 1cm 1.5cm 2cm; }
        body { 
            font-family: 'Helvetica', 'Arial', sans-serif; 
            font-size: 13px; 
            line-height: 1.6; 
            color: #333; 
            margin: 0; 
            /* Padding as fallback for browsers that ignore @page margins in popups */
            padding: 1.5cm 1cm 1.5cm 2cm;
            background: white; 
        }
        .header {
            text-align: center;
            margin-bottom: 15px;
            /* To repeat on each page, we use a fixed element but need to wrap content with margin/padding */
        }
        .header img {
            max-width: 100%;
            height: auto;
            display: block;
            margin: 0 auto;
        }
        @media print {
            /* Keep header at top of each page if possible */
            .page-header {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                height: 80px;
                text-align: center;
                border-bottom: 2px solid #D5862F;
                background: white;
                z-index: 1000;
            }
            body {
                margin-top: 100px; /* Offset for repeating header */
            }
        }
        h2 { 
            font-size: 15px; 
            margin-top: 25px; 
            margin-bottom: 12px; 
            color: white; 
            background-color: #D5862F; 
            padding: 8px 12px;
            text-transform: uppercase;
        }
        .section {
            margin-bottom: 20px;
        }
        .grid-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px 30px;
        }
        .grid-full {
            grid-column: span 2;
        }
        .field {
            display: flex;
            flex-direction: column;
            border-bottom: 1px dotted #ccc;
            padding-bottom: 4px;
        }
        .label { 
            font-weight: bold; 
            font-size: 11px; 
            color: #555; 
            text-transform: uppercase;
        }
        .value { 
            font-size: 14px; 
            font-weight: 500;
            color: #000;
            margin-top: 4px;
            min-height: 18px;
        }
        .signature-block {
            margin-top: 50px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
        }
        .sig-line {
            border-top: 1px solid #000;
            padding-top: 5px;
            text-align: center;
            font-weight: bold;
            font-size: 12px;
        }
        .footer {
            margin-top: 40px;
            font-size: 10px;
            text-align: center;
            color: #999;
            border-top: 1px solid #eee;
            padding-top: 10px;
        }
        .hours-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 6px;
            font-size: 12px;
        }
        .hours-table th {
            background-color: #f5f5f5;
            text-align: left;
            padding: 6px 10px;
            border: 1px solid #ddd;
            font-size: 10px;
            text-transform: uppercase;
            color: #555;
            font-weight: bold;
        }
        .hours-table td {
            padding: 5px 10px;
            border: 1px solid #ddd;
            font-size: 13px;
        }
        .hours-table tr:nth-child(even) {
            background-color: #fafafa;
        }

        /* Print Specifics */
        @media print {
            body { padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .no-print { display: none; }
        }
    </style>
    </head>
    <body>
        <div class="no-print" style="background:#fff3cd; color:#856404; padding:15px; text-align:center; font-weight:bold; margin-bottom: 20px; border:1px solid #ffeeba;">
            Para guardar como PDF, selecciona "Guardar como PDF" en el menú "Destino" de la ventana de impresión (Ctrl+P / Cmd+P).
        </div>

        <div class="header">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAAAACaCAYAAAA3rzq1AAAQAElEQVR4AexdB4AcxbF9b2Z3L0p3ygElQJlgoggiCIQECAPC5Jz5RJNzNCAENmATjG2iwQZsA0YYMCKDkQgCRBRJJAkUQDle2N2ZX9V7e9o7XdQFXajZqelcXf26Z6arembWg4fQyDCwMWBjwMaAjQEbAzYG1owBhvQ9R397+OHwo48/DT/86BMjw6BFjIEPPvw4/H7WD+HceT8ZGQY1joE5c+eHSj/9vDBcumxFuGzZMiPDoM5jYPny5WE8Hg/b2BZ6sM0QMAQMAUPAEDAEDAFDwBBoJQiQhO/7sM0QqB0BuiyeR1BsvC5gB0OgHgh4XltTlyG2/noAYFkNAUPAEDAEDAFDwBAwBAyB9YUASUQiETMArK8OaGX1egzhMYAvBgCYAaCV9d76EZcUU1EYusrV0Oi1NQOAtKztmTSkUbYbAoaAIWAIGAKGgCFgCLQtBMjUxDwajaItTsrbVm+1kNYQID2Q4oFthkDtCIRlyr/mVAOAum2JtC2eHowMAUPAEDAEDAFDwBAwBAyBloxAemIei8WQ9rdkeU22FoCALOSShBqMSDMCwLZaEci8trRBA4BrvxkAHAx2MAQMAUPAEDAEDAFDwBBo6QiQqVcAWrqcJl/LQCAMA6gSR6aeHmkZUpkUrQEBks5whDa1pRpjBoAUDnY0BAwBQ8AQMAQMAUPAEGjhCOj7/6Qpcy28m1qQeHRKXJjxWDdsMwRqQICke2UkbTiqIWvrSyqT2AwAZUCYYwgYAoaAIWAIGAKGgCHQshGw9/9bdv+0NOlElzMDQEvrlFYgD5l60ohkK5C27iKmc5oBII2EuYaAIWAIGAKGgCHgECDLVljdqlno4uxgCKxvBEgiKyvLrc6tb1ms/paLQHq1X922vIrbcnugbUimTxu1jZaUt6Lc45X7zGMIGAKGgCFgCBgChoAi4BR/wPN995drGmVkCKxvBFSZ0w8ABkFgRoD13RmtoH6S0I//QTaScrTdEKgbAnqtIdvamFnTdjMArMHCfIaAIWAIGAKGgCGgCMjEhyQ80P1gmyHQAhDQ1f+0GLq6m/abawhkIkASaSNRJBrNTDK/IVArAnptaZOr/xkt9zL85jUEDAFDwBAwBAwBQwDQJwCE6BFiAYBthsD6QoCUMSiVk4S+/6+TczIVJ9G2GwJrIyDXLk/GiO95cvmysbI2QBZTEwL61EhbNABkttnLDJjfEDAEDAFDwBAwBAyB9Fv/JOHRpgqwbb0hoAq/Vt4eJuXaTqOGIUASJMWGGZb9/V/D+Fnp9oeAKv96vSFT46iNIFChGXZXrwCHBQwBQ8AQMAQMAUPAISCTH50Eeb7vgnYwBNYXAiSRl5cHHY/rSwart3UgkDYY6TvcSulw65DepFzfCOh4UQOAuutblsatvyI3MwBUxMNChoAhUBUCTEXKHAyQpUG9cPgSp64nYVUPJChW91Q+OxoChkBrR0BObGmC7/luFU28thsCzY6ATsJJOsVf3//XMGwzBGpBIAwDuW55NiepBSdLrogASRk3viNSZ7VoO1ullniVwhY0BAwBQ2AtBPzAR0R+lBSqtg8fYRiRkLj0kJQET+L8UD+2IwFJsd0QMARaMwKp89iP+PB9rzU3xGRvxQiQdB9z0y//k6kx2YqbY6I3CwIhPI+IRiMyTwmapUarpPUjQFLGSyjjJirjZ809j2wb153KPbSmhZVTLGwIGAKGQBkCSS9A4CXFmi5mgDAGj6FcIAPn+vThM4ZQfgETUiIUst0QMATaAgLRSBT6OGRbaIu1ofUikJ2dDZKOWm8rTPLmQCAMQ/i+b2OlOcBuY3WQdAaANtYsbc5a5K0VYxGGQAtHQC27KiIpkwHQPZLOMld0UPFRk1NumS5KCblIOVBJyooD55Tl0XD7Ih8pAOAwBCQMil9J4mTvlBfFsL6dMH7L7jhz7Ma4YvxA3HTkYPzx6I1xzwnD8OfjBuEPR22Maw/aCOfvsxGO27EXthvYCb07ZSHiKR/hGYrLKCiu+EDq0QflJ1XYbggYAi0SAb0whm4ylBXLbpESmlBtGwGSroE5OTlmhHJI2KEuCJB0BgA1BHieB9sMgbogoH8bGY1WXP2vS7nWkWdtKe3MWBsTi2nBCFCVRpmXkhRFVTyyU+KUsmJZyM/LR8cOHdExvyPycvOgcR4891hPuXGAqQYqC2rZdnoWRBDAd4/x58AXZT1CD13y87HNRp1w3G59cOcxQ/DkOdvgsRM3xI0H9MAZO3XAEb/IwV4beti5fy5G9Ixg5AbZ2H1ANn41NBsnbdsBl4ztiQeO7I9JZ22Bv568Oa7Yrx/GbtINfQqzEMuOgHozpqAuFA3bKfCp4WdHQ6BFI0CVLgSysrKRnZ2TuoZqnJEh0AwIqPKmpFWpAYB0I1KDRoZAjQjo6r8ncw2l9BiqsYAlGgKCAEln8BZv29uraJHNwKsAxaJaLgKeKKpBUmalAdCpcyfstddeuPTSS/HQQw/hrbfewnvvvedo2rRpePfdd13co48+iquvuhrjD9gf3bp3g+i9CINQVH8xDKhVIGy57W1KyQJZlQ/kgueFxejfJR8X/bI/Hvr1Jrj/+H64bPcCjNkkH707xuFnwb3jX5qIIxEmBT4BLC6XjgSRKA2RLA4RXx2ieEXSUWmxjyzJu0V34Mgt83HbId3x6Jmb4dbDhmD0pp3F6BAiFOU/7kdgmyFgCLRMBOQsl6tjiJwcNQBkt0whTao2jYAqb/ruv67KqV+pTTfYGrfOCKTHBrlGidMV3XVmaAXbHQJ6nVHjUVtseFVtkll8VdEW19IQoKirmTJpWKlbl27o3bO3o149e6E60jxdu3SVlV7fsaE71v1Apkpky2pQz+49a61P5ejRrQcitSl5KbY1CsKytnvwsMEGfXDyKSfh8Scexycff4Knn34aEyZMwJFHHoktt9wSQ4YMwcCBA507dOhQF3fIIYfgmmuuweOPPYFPP/kE/33uOZx33nkYMngwEBIoaxtkIylBiq+aXWbF2bFs9OrRK4WBuNrWxibtL61DMdR3cFUakjXLppkqE9MR6iHogqljTiyBkUM64ndHDMM/z9gYJ4zMwaDC5cjKk0z5OfAjSQQsBbwEPLlSRKIe6AG+uMgOQSE/l/BykKJsgTOahBeUwC+NI1iRQGKlh+JVRGF8CfboG8VtBwzAP874BY7YoSt65wUiDx2BZS5kI8D06wiwzRAwBNYbAiGQl98BpJyU600Iq7i9IRCEoRtzJJGXl+f8ikFayVO/kSGQiQBJGSeA53syz/XET1loCDOzmN8QqBYBTya5+i8j1WZo3QlVSu9VGWuRLQYBkkAA6Io19FomRCFVxG+68SZ8+umn+ESUWnVnfDoD1dKMGfj8s89x1x/vQl5OHuTqKEzVEf6ofvNkxV1PDIDYfLPNMfm5yak6Rfn+9JNPq69PZPnss88w6clJTlFGxqZNErYuxhO+zpNx0Do16Fxpq7Y94kVwzjnn4IPpH+DPf/oLDhh/AHqJ4cP3fc1aJ/I9H926dsdee+6Fm393M957733cesutKOhQAJLQdnriVp5kSBQoP8W/a9eumDRpUgoDwX2G4Fot5oLBuqa5/lTeQs9PnowNem+gEpQT6riRHiANoBhPKKvuQASQuEE9ZGX+uM3x5+OG4JebBujQLYKgowcvLwY/JlkicckawveJCCXsAaqTh5EAST8BiHEA4ldiTPJJGX1SICoGAT/PB3M8+LkRMBqKQYBIFkdQujJ0Twps1rEUV+7VHX87dwTGb9UTnvQL9VUESn56oFYlfjgfbDMEDIH1hYBcfzt0NAPA+oK/vdar9wBte3Z2NnRVTu/JJEFSo40MgbUQ0A8TUybLsYiPMAxcuud5zrWDIVATAiShH7ptu+Ol6tbb2VE1Li0i1vc89OrVE6PH7I5jjjsaF190IS695GJcdNFFuO223+PCCy+EKqSdOnVCbVRQUIAuXbrgxBNPxO//cCs8UbQ8r/abqRjiIVdTFHTsiIceehC77LILOnfu7B6/d24tdY8bN84p7nJdLsdUeYYgSLlcB6HwlyRxUEbuEX/xq+IvubDjjjvi5Zdfxo033ujaSVIKNGwnCZ1cnHnmmXjttdcwfv/94asiKvGyV2QusqiQ0VgUd9xxO8aOHevkKCwsdG5t2K9LeqHwVlKMd9ttd5x/wflwuIhwTpyKElYfkvsgIT+KRzphg8JsnL9XPzx0ymDsOhDIzV+BrO65yIn5iEWj8OXmqRdBHR9hSOkSvUR4IJUHoWm+74MZpHH0JU2IngcvKv4Y4Wd7iOREoEaBSI6HMJpAmCxB6eoIEisCdAtX4tp9u+JuMUJss3FHUMaCL3VSyD15IPLCNkPAEFh/CBDo3Knz+qvfam6XCJB095rM1X/YZgjUgEAYhvD9CNz8RMZPDVktyRAoR4Ckm9/qq0blkW3NU017vGriLboFIJAMAsybN18U1Nfx0osv4zNZDe7VsyeOOPwwHHjgQSguLhbdvO7qoL4PpRfH/fbdDz179KhTWbURyHUVW2y5BYYMHupOlDQ0esFN+yu7mqak8QMGDFCnEqncIQoKC7Cl8N5pp5HYddQu2HmXnbHTzjs5GjlyJI465kg8+eST2GmnndyFXXmSopiqUJU4rktQldfNNtsMf//bwzj6mKOEhV4MKp0Wrj4gK5aFjTbaSPIAiqXzNOGBVFkoNYTo36+/uLLXs92hKNMQxVr7sV+vAtxx4gCcMboDem6QRLRrBMyPQJf4g1iJGw/JZBKJRALJRBLJZIggGSAIKCRtLrOqixTQhwnSFPghZJlf4oIU+UmEkRChrP4jFgCxEF42xBDgIys3hjCbUlcAb7nwLPKxc+8o7jtuYxy1S3fERBwigkCZI3NjZsD8hoAh0MQIyOXH1dB7g95OGXMBOxgCzYCA3uf1cVydrzTHvbYZmmRVNDECpMwcIjKBkHpImy8IDLbXggCpc9EQqvyrLlBL9labXJ3gXnUJFt8yENAboSplc+fNxTP/fQ7nnHc+tt9hR+w4ckccfPDBblX89ddfR0lJSY0Ck3QKNGTr1q0bhg8fDlneBUPUuIWqiIUh9hyzJ/SGrJlJOkMASQ1WSSRrzCMsRQkESktKsXjxEuhNXt/ZP+ywQ3Hn7XfiqSefcoaPBx94CN27d3cTUJLOhWxVnayKlSQ5Xuqmw+oqaVwmKY805eTk4Pbb7sD/nfJ/KVwkI4UUI3VIF4Ln+65dOjHRsprWFESm6kvzLpc/CFExJZ2jzJVyugpPeNK3IqsHye/h8B364p+nDcEvBmQjJoq/nx8FsgL44pByEYx7CEqBZAmRKBWKE2FClHipL0AS+nhdJMwWXjEEXqD6PpzeHwJ+4CH0oggiUUQISJUgJYFqEAjBiMREiWRUwlpnFuGJESDISYLxECXFCXhizLpwdA9MOGIouhdGpLwPQlyPbtx6EEFhmyFgCDQXAml7X08xFjdXnVZPn/re+wAAEABJREFU+0VA73FKikAkEnHv/qvfyBCoCoH0WCHpknXM+DI/07lkOs0l2MEQqAEBHTPp14xqyNaak6qVXWbm1aZZQktEQBSroqJijB8/Hn/5y19w6qmnYrvttnMWrLqK63k+Nt54Y6eAhwhrLBbIinBWVraro8aM65hYVFyEH378AW++9Rb+8qe7ccZpZ2LrrbfGtttui8MOPQz33HMPPvjgAyxbtkzkrSgrmbrwp6smWUH5J9eE03mqc/WGkZuTi6uvvhpbbrGlQ4WifIoWCk2jnCmp2irKUB2/xo5P1S1cpU1qPBFf1buKp6QtYBK50Sycv09/XPWrrui2gajU3YgwTxXxpFOsw6SHZHGAZFGIeFECydIkRN8H9MkBxydVTSjhJBISCBANY6AngAg4hIcIiWiyFJGgGEnxhxKP8k1CgiOFPN8DIyH8qFDMgx/z4WcDgYzpREkcQUkS+w7wcOdRQ9Gz0BPOBANCDWChJ9aJcp7mMQQMgSZHgIAn52z3bj1AssmrswraNwKquOko0/utPvqvCh1JeO5eA9sMgQoIkDpa4OZ8OkZUiUtnIFNp6bC5hkBVCOi1Rlf/NY1sq2NGW1c1eVVHW2xLR6CwsBC9e/eGviOuq9dk3QdvKEs7W221ZdmkruZy9IiePXs6hZysOe+6Ypa68QtvH6AH6IX8uOOOg37Zv3///ojH41i9erVTxMMwRHVbaWkpvvzySzzxxBN45plnMHfu3OqyVhmvvBXP+x+4370iEcjqt2akiKZpiWQC8dK4RjUz0b3uUbdKVViACEFZRTlvXC+cMKYjcromkFUosbJs7/se/NBHcnWA0pUJlKyMQw0AEN1fFW5P0jx98gNrtqgfIltW75PCftHKCH5eFsfPyxNYtDKJn4s9xCNZyIp4iLiVesmENZtipyFS4kXZD32pyA9EviTCrBCRbB/RSNQ9DSD2IGzaJcB9Jw3FoN7ZiEoZCtdQZFIeRoaAIdB8COi1uE/fPu7a23y1Wk3tEQFPFX253mdnZyMrK8tBoPcOJRewgyGQgYCOC5aFY7Go87k4GUPqugg7GAI1IKDKfyQScTna7Jhxrav64FUdbbEtEgG52jXOICUGDhwMd8MNAbleQljDbRoWEv3RxVGOqoTn5+c33SRQ65PKRTfUarHDDjvg7LPPxv77748999wTI0aMQK9evdyKNUnJuWZP4zF16lTstfde2FIMG4ccegj2238/bLXVVvjjH+8U5blICpRVIr6qdsVCiaT7t4PDDjscKown69CQ1W8IDsUlJbj55psxe9YsFBcVoVTCpaUl0NcvSkpk9TspCq0YV4IgcFilZUM1WzpdXSUtVyI8U1QM5V1UtBo//vgDHnn0EZCiwEPaURGCCtyJQMI+cqMxXDhuQxy7ayfkdcsC8yJIMoFILACTEQTLgPjSJBIrRdYEnbyerPB7gSf1SJzUE6WPIBnHt4sTuH9aKc5+ZBEOvu1rjP/DdOz1+6+x561fYcytMzH+9zNw6G1f4fzHluKf05fhu0VSXgw1EZEzpCzxU8LCj5R6RDoIX4ixAFEfftQTQ4BQTJCOyoVYsC4qDrBRVhJXj++Dwg5ZgAwMH8IMthkChkBzIaBnnP51rL6Cpden5qrX6mmfCHhiAFDSuQZJt7LbPpGwVtcFAb0+hTLfichcwve8uhSxPIaAm+sqDHqticViIFlOGt/WqKb22FlTEzotLE0nYaJXOalCd4QbuKjnRhKq1OsJkCqaOgE0nJebg4iuxmqCVKJ16uP4GiSpTqMTPeUrlQlnXQm++OKL0aFDBwmJDp5usAtVfZg+fToOOugg/O/1/6FEFHIoO6EFC352/5QwceJEJJNB1YUrxSoGGnXE4UfA90TtlDYz4yyZNOkp7LzzThi3zzhHe++9N/bZR2kfHHPMUe6vBUm6i4xip7xqonSeH374Aaeddhr0XxN++ctfYl+hfaQONYDoKx6Tn38eqgijlk30Z4Si6I/foQuOH5WDaFfA65BEaSSJaEzwLCZWLylG8fJSJEqSkPungwsIUezli5FgldQQgtkJvPb1Kpx0/2Icfvss3Pjvb/H0ewvw+dxVWLgqgVViAFldXIJVq1djwbIifPLjSjwxbSGu+dc8HHbnTBxz78+Y8n0S+bGkmFB8gBGpgaADkwCEBCdIkhchlHyRj1kSIULFS4AtumbjT6cMRGFOtshVt/6DbYaAIdAoCITCpXfvDRCRFRJSzlcJ224INBUCSTGgpx/9b6o6jG9bQiCEJ9elbPe0iF6t2lLbrC1NiQBJ9y9g6fl+U9a1nnnXWH2GalNjPktsQwio0qkr6ukv2ou2KsoZRCUjOhYUYNSoXXHppZfgvvvuxQsvvJD6Gz+IilgHZVyy1XtXeaRyQE5K/SL/mDFjRKSwTisAulp+xRVXYMGCBQhk9R2VNv2i/Z///Gd88snHlVKqD6o8m266KXbffXfoqryy1TgtEQpSP86dg9f/9z+88uqrjl595TW8/PIreOSRf+CII47ArFmzoBcWsuZJs/JU+umnn9yTDvfeey9eVZ6vvIKXhJ/SG1OmYO68eYJHAHpyurJmnrJYjtHDeuKCvfojp3MEfk6IpKzsR72I++u9xBJZ+V8eIogThPDDmi0arEC2n4NP5idxzn0LceZfZ2Pat0uxurhU6k8AflxaL+MgiKwpJL5QOFFcPxStHUVYVZzE+98uxOn3fIGTH/4J3ywgcvULg0EgslSsU40aoRdCDQHuXwOyAkSiUanEQ1AaYvOOAU7doyeiatmQOmw3BAyB5kNgyJDUk2J6nWq+Wq2m9oiAPvqvrzPqPZftEQBrc70QoEfEylZw61XQMrd7BPTVNjVst30gam6hV3OypbZVBPQdO33U3rVP7rY6wVMFet78+XjppZdx442/xckn/597D/+kk06CrqJ/9tlnWLp0qVOKXblGOpAigCiRYTLEHmNGQ5VnJd/3QWpa1RWFoo7qyvm7770rvkBIFMmMrJTRrW1asHAhbr7lZpeikwttqwtUcyDprIOHHXYYVI50Ni2nFIghJFSrgIhGEoFo3ZS6VJ9Web7//vt0kVpdkmKc+ARffPGFk59yU9N2QZVi5a98xQ2CEPqXfKHUXZmpoISo/OhF0Dknggv364GCTivh5YVIitEgxijClUTJEqJoWRLJUmEowgaidTP0EIpynfQJNRK8PD/EiX/5Hq9+thSliWJR2EsQSFtDqR/uKYokAjEoZMoQIpQ8UpfwSXiB+BMSk0RxHHjlvbk44o9f4835HrIYSK2hKxqIMcC1JZSw4BdKOTUGKHkxgNkBEgmgdAVw2HYF2HeL7oiIrIpPFJBshG2GgCHQdAh4crZutPHGcg325BrRdPUY5/aJAJm6hpOETsYLZPGBpIw3yv2jfWJira47AqrE6RxR5xFKdS9pOdsTAjo2lEi6ZuuYUcORxrmItnyopW2qXtSSxZLbGgIk3U1WHy/3REFUHUzbmD4hQlHIAlHzkkESiWTCvZOvH8f79ttvsVCUac2XJi3XUHLKpTAh6b7AL9467dIKzPj8U6xcsdLlpzuuOSSlYaJegjLK//vcc9APBK5Jrdmn7Rs3bhw6duwokxHlUjG/xmieUFI1RcPqZhJZWaLMVLg+gG5lhZWXU7aFp4iuKRUn3tWwC+kjEOU6JvWdtd9gbNgjCb9jBF4QhS9Kc3xlgJKlcSRWikYudbk+lzq8MIkkJZ/0d45U+OKXxTjvT19hVUmJ9HuRKPIiguQPmEQoecQrEdXskg4EQBLQdsgBoZRLIMTK4tW4+KFv8P5PIaIiI0nXdmrHOHbCWcp7YvzwJY5eCEYBLxZI+yOIFidxxp490LtrLgj9G8IIpFmupB0MAUOgaRDQSVKP7j3F7ifno5yXTVOLcW2vCOj9k6Rc40PYe//tdRTUv906blSJ09dF06VJpr3mGgIVECAJktBFJ03Izc2F53nqbfNUWwMNhdoQaoPpegHVZm2yySbuxqv+6mirLbfCpZdeiv/7v//Dvvvui4EDB5afPCSrK1a/eGGjMpH6ccKB9So7c+ZMlMZLRc1UxbNiUYYQWQlZwMbSxUvd3wnW5cRXWZRTYWEhunbtqt4WTh6S0tjtBxbi8G06IrtDKGv0oobL2R2WJlCyLEBCVtJ9t4KfaopAo9/WR1KUdk8U9flFBbjh8Z+wIlkiQEYkXgqnsjboGErPhAHxw6oQV/3tWywpEd7JpLsgr8VY2gBV/qVqP+LBywoR94sRlITol70aB+/QAwjiEFsFhO1axS3CEDAEGg8BfSS7X79+oGOpVwznsYMh0CgIkHJvlou5vvevTyQqU08m5mRqxGnYyBCojIBT/qNRkDZOKmNj4bURIFPjhKR7slevMTrHJ1Pxa5doMzG1NkSm2rXmsQytEAEd4EoqetpVfyYNHz4cffr0yYxyfkJ+enIQ2G233aCPWmlCmg8pCRohpHFK4l3nnRR+Mr+MZkXRIb9DvfgkE8ny/J4nfCQUlZvDZpttiuNPOAHnnnMurrzySlx62aXo1q1buRVQsokiKZWqpxKRFMOB56hTp06osGkVQpKlQnRmII1H2s1Mawo/wwSQII7YoQAxL4lELCayR2XlLhDlP474iiRksR/09HTXNofSwyHiYgKIiNIdiIJ+49PfYc7ylfBLo8KqVNJlNb8ewrIME3UrFiMCMTB4iSJ8ubAYf31tDnJikjn0Qak7M68aCwIGkj9AKIaASMSHnw2RkygpzsVhW2Vhsz75oGj/fig8Mgub3xAwBBoPgRDo0LEjOhYUyDVzzTW28SowTu0RAXLNdVvvj6r4qwFA/YqHukrqNzIE0mMh7eqcQf/yz5O5XnpF11AyBOqCgD7RprpBeiyl3bqUbZ15apfaqz2L5WiNCOjgVtIv65JrbrraFo1XVy2pG2ywwVqrqaqIaXosGoN+kV796TLqVyJFDRPrvcaTFflren1IeWj+qO8jIqT+upK+ppAuL+KIcggEssL8+edf4D9PPYWPPvoY0VgEo3YbhQEDBrhvGJSWliKNi95E0uUr10nSfWSmQrxMjCm1KLl4umOFA7kGmwoJTRQIRBnedMNOGDGwI8J8wg9CUMDQR/+DVR7ChCjzPkSxh2xhOYV+EhHJ++2iAK9+/BMCsRIkWaoAioot2Rpl19EUQHGGF+C5D5dgeTFBLyEyrq1YkJImpFWHfohIJBvRSIiktKEjQxyy0wB4flSMBKFmMTIEDIEmQqBXr97Iy81z3MNQriHOZwdDoOEIkJRrewT6bz+h3KtINpypcWizCLgxIq2LRiIyR/QAuR7ZkBFAbK8VAZ17quIfk4UxkiDXUK2FW3OGOsguZ1IdclmWVocASehFM/24S2YDSJYHf/GLX8jFtDwIyi8d6tGjB4YNG+b4kExHr+VqPUprJdQ3Yh10uoR+Kc7VI4qmTCRU/GQygMYvWrQYL7/yMq6++mrs98v9sK0Ddh8AABAASURBVP3222PkyJHuS/133HEHZsyYAbL6djm2VR2knkAUZ6clJyWDzo3LSHFQ44LENtseE2v46Xv0QG5uCN9fCcovKAGSywPES5IgNUbEEbnlWLZT+r0EWfTwwudFKErKpUCiyhJrd/Ql/HIilHWaqiusmP24WP9eMAnPTyAMotVlTcWLSH7MhycEyY+SLGzXP4LuOWLUQH2ETbGzoyFgCNQdgc0229wpaXUvYTkNgeoR0HtjEAQuA0noK3ae50FJ01yCHQyBDARInVuEIIlINAJV5NJjKCObeQ2BahGIiNFInzTS60y1mdpgQl2a5NUlk+VpfQjoDXXRokX49NNP3cUzswXkGuVp6NChLqk8RjykHEK49/31KQGXoeygfMu8KCoqKv8oYDquuV13MxBxtd6UkzpqWDTclAOiNFEK/Wu/Bx54ABMmTHBGgEGDBpWl189RTPr264u9x+2FE08+AZddfimuve43uH7C9bjmN9dgww03dAzJlCyZmLmERj7075mDnTcskJujKNXJmCjWQFAkE61iH57+ZJKlyjkEB5RvoaRkQWwHeO/rYoRhXFJEXtnFI7sHiIJPKROhj9yoj24dc9Cncy426p6PIb1yMbR3igb3zMOGXfOwQadcyZMteaPwte0hhYeQ8KAjD3Ek8Nz7C5EMsqH8oXkkDVURQ9AP4EWldCyKksBD76wkdh7WUcqGsM0QMAQaFwEKO5IgiREjRjhXospd9RsZAg1BgCT0i/82IW8Iiu2krExcKE2NOuU/Ir7UTmpsym9HQ6A6BPQao38tqq7maeq5uNbRQqhOYsgsv075LFMrQ4AklixZgnvvvRc1rUirUqxNI1MXVD1B9Kv8SkOGDHYTPzKVRtKFXR65ML///vuYPn36erXge5QhLLqgiANxRJGVI7VFoiOKk5ZVXf2gn05q1ejRvXt3ZD4SJFnrvCuec+fMxauvvIZ/P/4kJj01Cd/PmoUNNxqAI4840hkASFbASg0VKkOdK6lrxgD4RZ9cZEeLQC+CgGIxLw2QWB0iSBIQfMIKSjbKNyKCOauA739eCsoP+un9IBcMI+heEMXOm3bFufsOwp3HDMK/zhyCZy8YjqfP2RjPnrMh/v3rgXjirBQ9dfZG+O+5QucPwX/PH4Z//Xoobj1yEM7cewhGiGEiR5T3EFH5wb2eMH12ERavTgIRMTqQIk915AFMgn4cni/9imLp1BB7b9VbwrDNEDAEGhMBPcX0OhCGKCwsgF4nG5O98WrfCJB6nQf0n3Wi0TVPfzXJfbF9Q91qW69jIZOAAL5PxMQAkBo9AJn2wTZDoEoEPM+DUqbyrxnJ9jJ2tLW1k1d7FsvRGhEg6S6Ur732GkpKSio0QS+wGqFun7590K1HN6c8UyL1pIF6xL/11luDLAtIWHcto67S5MmTUVwsSpkEXDlxW/KeKXuD5BRM9NsDpaUlWLp8KT7/7Avcf9/9OOqoo7H55ptjm222wVlnnYW//vWv+OKLL1LvvzeowpoLbz24i6y4y9q6vpYQEAnp7mQ8Kav7ASr2XkU+khNzVxRhweoAkTCKHTfKF4W/lyjwg/HCBZvg3mP64IxdO2D3TWIY0j2CTrGEGBo8hJ4vF1eWE/wowkgMWbJa30lW6Id2T2LcZjGcs0c2Hji1PyZfuAluPLgfNt+wq5SJYtmqYiwvCuCpvKhpC0FSyngyCfBA30OY8LDZBvno2yUG2wwBQ6CREZALhuj/GDxosKzSdkwZVBu5CmPXPhEg6ZR/fRy30e7F7RPKNttqku6eT6Zcz/eh44WUhQ29MME2Q6B2BHTBTf/FxpfxU3vuNpijjk3y6pjPsrUyBPQGSxKzZGX6xx9/XEt6PUE0j66Kb775ZnAWALBcWfV8YvjwTdYqpxFaTlfBp02b5iaIGtb49kL6dARJBxm10VRFVTxyg1KDyBVXXIGbb74ZhxxyiPvwoC8XIZIgKZkaeReWA7tnISui8qiCHCKIU1bxCV/kQg1bkgnM/jmO0uIQB+zUC387rT9O37kDNu0VE4t7iKSULUkkkAwCxBkREv6etBWycg9KahmFskIfFEO/3J/wNF8MCTEoJOK+yJCNHh1DHLR1Fh45a0OM3aobSkuTWLoyjkgteAicUgfKDAA+xAqAMPBQECzFRj0LXJodDAFDoJEQoPCRk44eMWyTYW7iLTG2GwINRkDnCLm5uVBSZp6s0KlrZAhURiAIZA4TBHK795CTnQ1S5jZyXbIxUxkpC1eFAEnoyr+++6/XnarytPW4urbPq2tGy9e6ECB1Nge3Qj937txy4fWEICkXVx96QY1FYxi540hRZkNAilAODInevTZwq0CoYiPp3v3//PPPHR/NonzVbRdEsZfIDUnbHDhXwtJwQVCOgP51oFqtdbKjFyKSIOnSGufgI+IYRdCzUz76dwpQ5EUhmj+SpQkgLpLInkAAsQSg4uZJMEWeKOmUUM/CbJy/eweIri+Ku0RIstxypWgAQgKIiit+/fKujA3Ch1SWQZKHkieUeLl5Q0nrVkNBsBqhlItLmSBehGN3KEQsIvmTCRFTa1cSVm4XoV25QEJCUleo+HpJhJEk6IcIoa0iNuvdAfR8eGIQEI/kt90QMAQaggAp56LsHjxsuskWiMflWtIQhlbWEBAE9BquX/uv/Hd/kmS7IVABAbn8wGOIiO8hKxYtTyNlRiJzgfII8xgCGQiQdCGS0Ll3+hUjMhXvEtvPoc4t9eqc0zK2KgT0pqukK/X6rn5aeHLtE2KHHXcQpSwmWUKQkh7CPcrepUsXiVuzK790aPHixVi5cqUod6ErQ0q5dKK5TYoAvVDUZMFb9g17dkFulo9kInSPx4eJut8oSSI/m+iYH0VedgShWN2x1hZKTEXSkERW2DVOJBAFXX2aJCGRL5Q6NKSkdoEuHXxExACQq/VJbo2vltKsJIOyISk+MQEIo+4dY6C4ECwQarwk2W4IGALrjECo55Occ5FoBBtttBGCKq8H68zeCrZTBPSdfzUAtNPmW7PrgYDMGmRRyRMlTu7v7n5fj8KWtd0ioLoJSWRnZ7tveykQGqdu+6O6t9gMAHXHqlXlJFOKoJ4En332mZNd/UoukHHYasutUVBYIDEE5aiHvffeG6QLaYwjMhUmia+++so9XWCTRAdN8x5kYi7zdFdntw5yowyTogdLTFxO56TvJu7az6nectmqPKjeXJgbRW5MyukD/9KvaOItW1bxIxEgO6bSySp/PeojpYzsQRigMBfQlUo5wA99UH71YGVZDQFDoDICBHSRrVfv3thggw0qp1rYEKgXAp7nQRV/fRJOFyLqVdgyt0sEfM9zCpyOnXYJgDV6nRAgWeGxfzf/lTh114lhay5UD9l15l+P7Ja1tSFAEh988AFWrVpVreh5uXno2aOnqFAU5TF0J9J2220nk0FRKqsp9eWXX6K0tNSl2knmYGjGg5y2BLwgiQGditwD+mGSSCYS0ImWBx+k9KWn9vTKfahKd4oYJsTSnoMu2UDUT0JzA6m0td0Q1W+alllOc3pyWJtyozIpjEWQHYkh6UVAJIDyOpWPBMt2kiAJOUA38cmqv/AUI0dBTOqj5BeNJaiynVrCyBAwBOqKQOpUI3bZdVe5LmTVtZjlMwQqIKDzAaX8/Hz3zr/6K2SwgCGQgYDMVKDky609KyvmXk3NSDavIbAWApnXFJJu5d/P+NYWqbPFtYq1i4j6NFJOufpkt7ytCQE9SVQh1NX6RYsWQcOV5de4rKwsbLzxxhAN0CXrX+T17dvX+SsfyNSJ9eabbzp+Wr5yHgs3HwKeKs+qByelTl3SF71YfHXaA8lfkOMhJv2fDLx099ep7LpkohSKy60+O0LEhHTAiegSW7ddx5oShAdF8dfyKnR9eMA2Q8AQqBKBUK4dsVgMY/bYwybhVSJkkXVBQCfi+h0cfRw3db2uSynL014R0DGiY0bHC6mzhPaKhLW7rgh4nueyqqvf2Uq/8+8iMw5kuxtPGa2v3ZtCsfZ8lqOVIaAX1TStXr0ar732Gkg6ymwKSTfZGzJkiKz+B06p7927t3t0jyQqb8pT/1bwk08+cUkJWXXWOBewQ7MjEIKgrP6HiRBuMV2cugvho2MsKcVCJEN9laDuJdcpp8i2ojSJ7CwfWRHIpk8diFPPXcebsKpnKctuCBgCNSGgl3s1/A4bNtzdC0jWlN3SDIG1EIhEIigsLIQaktZKtAhDoAoEVHnTRagqkizKEKgSAZ0DqtFIlX+95mi4yoztLrJ+DTYDQP3wajW5yTWTNz053njjjSpl1zS1oo0YMaI8fZNNNnGPgFb3fv/06dOR/mcBfcKAXFNXORPzNBkC1GVvUfxl0R6LinOgL2KEpXIqJ32A+g0AyKZ9InGSTwIZu8aliGEcMd9HMl4kBgDCgyjkbmUdINPlU3khqRUJGRvFn5lPwxLldiISSNgLEHjEyqIQFH/MEwuARJNycPnWPujYdOKEwlvf8096cB8qQ4DiQMpDkJDyvhhAKP61OViMIWAI1BUBfQJguFz7c3NypYicW+7kE6/thkANCJB0r56p0q/Kvyp0ml2v3+oaGQI6FpQUCbmyyN1a5gFyH8+KRcxYpKAY1YiAjh0lUkaP3JdisZh7vUiNAFqQlBmgkPrbNdWz8TKzrmcJy94qEfjwww+xYsUK6EmU2QAydULpKwD6Nz2attVWWyEilnySGiyndFld/denAMoTzNOsCITSLfr6O+hh3tJSuY1C+lUpdCt3Kkyoh1opIqvxcQSJEB/PKYbnHsuH29J97QINOIQMkCQRSfjIZSm+mFWKzvk+ollx+CqkUjX8pRjI1PgMkiFCpQDwfWJpcSBtDkEpG8K9/yA+2w0BQ6AhCGy/3fYoLY0LCz2zxLHdEKgFAb1X6Jf+VfnXxQQNaxHSxpDiYLQGAR0boVgadWjoI/9pBW5NDvMZAmsjQBIkXYKOG31ihEyFXaQdHAL1PZgBoL6ItaL8ujqv4pLEnDlzsHTp0vKTSOMzadCgQdDHP/UGrgaAUKxsZMUTjCT0kf+pU6eW89Gw8tH86ho1PQKhVEFV+8USMH95CRLJALoynkwmId0mJMqyeGrrk6SsqkeZQF5eDp7+YCUCxsr7VapolJ0IoZ/58+VKE0QL8PJnyzC4Ry4iEo4Efo11kKnxp0+iJIOEtDMp3EL4nodFKwJI88HQg7JRTGpkZomGgCFQIwL0iM1/sTk8yskpOcnU+Sde2w2BKhHw5Fqs7/vr4oFep6vMZJGGQBkClGuL70fcR9tIQscPbDMEakGAJEi6D5Sr8q/Z7XqjKFSgegdSd/p6F7MCzYUAqQMfIODIc0dAtDw5VL+r8pc+QUi61f/vvvuuygKaV/+qZ7PNNnNGAHVJUd1EiaxcoKi4CO5vBVUgSVSlUxyQZREaqIbIinnSIYKuBGUyEZb5XUQLPWgzyDKZy+QtC1aQWHGtENFYgVC6H55IFEWhAAAQAElEQVRLlUB9F3vWrFnuCYBnnnkGJ554onscXXJV2LW8kkZWdjWuJiKlQslAEiTdqwBHHXkUQlnllejyneITNVGOVe+k5kilkWv8qZg1RzKVpu1Ly7omdd19jq2wVjcUDZmkUzJIunahhi0tS1XyaF8oPy2uH0t0rvCPxHw8+ugjmDNnDvTVjD/+8Y9uJdOv5t1l5a1KtZZX0rC6mXEaVlnUJbmW/F26dMUdt9+Bzp06QzdpmTrl5HhSgnplFFK5v/p6Jn5/2x8w6clJ7mOQTzzxBObPn7+WsqX1kizHKh1WHsIxYyf0mxVH6hgps0CQdOlkynUBOTh5xNVd/Tf97iZMnTpF6tAYo/aIgI4DJR0qUT+CK664HKNGjVprPLZHbKzNhoAhYAgYAoZA20KgaVojU9ymYWxcDYH1ioBonfoI+zXXXOMesdZHu/Py8qAfpKu82q5ykhSlStTzMoVs6dKlmDdvHhYsWIDi4mI3udZJt5Lmr4n0y/MXXXSR+xhX5XwhpB5PiB70R31sQTOFegBIoq1vnk/Xdl3xP+CAXzmctG+0j/Rjf6hmU+xJoqSkBD///DN++uknaD9VNgBUU7w8erfddsMpp5ziwmT1eJM6Hlw2eOK/9LJLcdlll7kP/OkrD2T1ZVOlqj7So3vaYciQIbX2t7ZZuWgb9YOTE2+YCF39D/QpAk0wapcI6MhLJgLsOHKkG5N6zSFZ63hql2BZow0BQ8AQMAQMgdaKQBPJbQaAJgLW2DY/AqRMgEHI4rIe8euzf42BAwciCALoaqwqU6QqdeFawmmaUlFREW686UbsvPPO2Hrrrd33BPbdd1/393+k8F6rZNURQ4cOxUknneRkUXk0l9aqdWi4Z68e2G30KJx/4Xm4/IrLcNjhh8KXlW/N16ykQjVjhZ70jH4YT/G57trrXb+kq3fYpANlbmYcRXH+7LMZ7pWBESNGuP7ZaaedcOmllzhDTWZe1LBpPv0+RJcuXZxhp7qsms91YAjokws6jqrLW1t85sjZZPgmOO+881zdqTqqL02mSmq+66+/HitXrXSZPTGiOI8d2gcCqWHg2kpSziLPGTZvvvl3iMVS3zUhJV7IZbKDIWAIGAKGgCFgCLR6BJqqAV5TMTa+hkBzI6BKksyMXbUDBw7CGaefAVX8lTSNpEsjU64LZBxUwbvppptw5RVXYsbnMzD/5/mY9cMsvPLqK/jVr34F/Zig8skoUq3XF2X+jDPPgCqZmimzyiAMMG/efLz15lvQ/gVFLNHy9d8OBg0ahF1H7YL99tsPhxxyEA466EChX6FDh3zJVLedpPs+RPpvIGsqpcYCJZX5xRdflGaIyUnkoSeHmgpaWptCwPW2dL1+xFT/aUTHn44LpTbVUGuMIWAIGAKGgCFgCFSLQHMkmAGgOVC2Olo1AoEohq4BlNm5KHbTp0+H/uXc0UcfjWOOOQbqZpLGnXDCCbjl5luwaNFCWUUOnPIvRR0bOzQ+AmEQOJxXrV6Fe++/D4q/Pn6vfZHZN+rXuF//+teYOnUqIFfAdP9K70I/oPfdN9/hs88+x6rVq7H5Fr9wH2m8+5570KdP33oLrk8b1FaIJPQ7B2oAKI2XIhBDhip9SrWVtfTWjQBJSHen7E9BCP2L0CuuuBzHH3eca5iOH1LyuJAdDAFDwBAwBAwBQ6CNI9AszZPpb7PUY5UYAq0eAbUD6JMAoRgClAJR1WoiyNmlSqWWUyVT3VYPQgttQBrntNJcU79omvafo7JOKXOcoSaejGPBzwvw0osv4corrsK2226LzTbfHPuP39890v/SSy+JYWdRrUiQBJmiWjNLqHskJgAAEABJREFUhiVLlrj8qhBK0PY2joAnY0Ob6HlUB5FIFJdddhnO/vU58DxfyHPxZCrdBexgCBgChoAhYAgYAm0YgeZpWmqG0Tx1WS2GgCFgCLQOBFTnKiNdnZ87Zw7OPOMMnHTSSRg5ciQKCwsbtR2+72PYsGHOANGojI1Zi0UgkBV/FU6NV6rw61MragDQ11A03sgQMAQMAUPAEDAE2hkCzdRcMwA0E9BWjSFgCLRCBEJ95sM9pY0+ffqgV69e0L/2U4W9sVqjTy14nuf+LrBTYSf3FACp1ofGqsH4tEQESEJ/+sTHaaeehltuuQWq/Ot4aInymkyGgCFgCBgChoAh0LQINBd3MwA0F9JWjyFgCLRqBHSllmSjt4EkgiDAiBEjoB8mpKiFWknaVb9R20TA93wcdOBBmDBhAnJzc0HSPfpPErYZAoaAIWAIGAKGQLtCoNkaawaAZoPaKjIEDAFDoGoESLrH/4859hgEycBlol2dHQ5t9RAGoftY5V//+ld06NChrTbT2mUIGAKGgCFgCBgCdUKg+TLZFLP5sLaa2hACBGtsDcvSRa+rMd/6TMzOzkbvXr2w8YYbY/jQ4Rg2WGkYhgweip7de65P0da5bq5zycYtqI9xKylXdTNJ4yqTvgKgcTvvtBO222E7UB83UNJIozaHQCwag/5LxU033QQ9D9tcA61BhoAhYAgYAoaAIVA/BJoxtxkAmhFsq6r1I0BR7H36oqCJLySgi7UZRIlzJPn0L72UqH6PLafxolh6Ik8YiODiHzRoII4++kjc/Ze/YMrUKZg6ZQomXD/BrUir4qqPpytpAzSspP6WRJT2KNYQi4snpH3gIfWr3Ee+54Pyc/nFbap2KE5p3JLJpMOzqrpIumiSshLcETf/9mZRCnPg6ThrQvlcpXZoNgQofemFnrt2HHfscfjTn/6EgoICqPGHZLPJYRUZAoaAIWAIGAKGQMtDoDkl8pqzMqvLEGjtCKhSp4/rjtptFMaPH+/ogAMOQJrGl8Xtu+++2GrLrRDxozLBp0z92XKaLqIEyRAlJaWYO38eJj//PC697HLsMXYMttlmG/zfqafilltvxZNPPokPP/wQS5cuRU0KbEtoGAXhIAzkSAwcOAj77bcf9t9/f2g/jJc+SfePupo2Zo8x6Nq1q4guFhA5NsWuY0Vx+89//oNZs2bVqQots9NOO2HHHXdMYa5fiKtTScvUGhDIys5yH3u8Vc6vvLy81iCyyWgIGAKGgCFgCBgCTY9As9bgNWttVpkh0MoR0NW6e++9F5MnT8Zjjz2Gxx9/3Lnqz6QnnngCU6dOxRlnnQ5VTNMrwS2l+ZQzXxaYIRoz4BOQcDwRx6wfZuPxfz+BP/7pLtx333245557oG2ZP39++Qp2S2sLdAtD15QxYsR45513nMzaHyr7Wn30r8fw7LPPYsrUN9Fngz5autFJFXkdK2+88QYOPfRQXHDBBU6hJ1lrXVr2+OOPd3jTtarWIpahFSAQBqFT/idOnIisrCyQbAVSm4iGgCFgCBgChoAh0PQING8NMu1v3gqtNkOgIQh4HuF+MnnOzcnB8GHD8ctx+7gvaauiddBBB2HbbbeFKqm6+qrKVJqqr5eq/0IYOxLWyNw0TLpasf3227lV/0gkAt/3a6RYLIajjjgKYRJp1mgpm+jLkAVzuAVmUUzUDUTQIEiKrCFGjdoVzzzzDO666y6cfPLJ6Nu3L1ShJenajBo2h5Tk69mzJ3bZeReM3388Dj3kUBx80MFuRV5xC0UAJWWjfZX2a3hdSNghK5aN8889H4UFhU5Gracq0nZ4vodBG2+Mww8/3FVH0rmNdfA8D8XFxfj973+PkpISPPfcc3j33Xeh7VSqrZ699toLm2++uWQLQbKcJML2VoSAJ1cWpfzcfNx222246qqroNcOpbqMg1bUVBPVEDAEDAFDwBAwBNYVgWYu5zVzfVadIdAgBFTRo4xanTyXlpbixx9/wA9zfsCAAf1x7LHH4vbbb8fZZ5/tFC1Vwkg6f4MqlcKeGB7EQV5+vlMuSWqwRlIZ9a+9UplEjpSnVRy1eWTtbay6MaEYFkIsWbIEM7+eCX0CYvfddxPl50pnUMgRw41io6TlG6OfSLp+KSwsrFN/ezqIAHTs2FFkFY8MrHVtrZRea9e2/fzzz5g+fTq0fWoE0CcSSDplfq0ClSI6deqEK1VZjEZFvlDKVMpgwVaBAEnoo/533303zjrrLKf8k3RjlGSraIMJaQgYAoaAIWAIGAJNi0BzcxdVqrmrtPoMgXVHQKfMunKtc+dkEGDFipX46KOPccstt2C/ffd1q6YjRozAIYccgmuvvRYvvfQSVq1ate4VlpUMdJVclsmjqpCVxamSV+at0lEZVfFLJ6rsaX9bdkNpnFKprHz/NH8+nv7Pf3Dqqadhu+22wyabbII99tgDp512Gh588EF88cUXCKQfpUi1e204a8HQ9Q9EUa4byuk6E/E4mmIjic8//xxLly517SMJfW1k+fLltVaXbu8YwWnTTTZ1+cU+Ia6iKo7trQMB6a7u3bvj4YcfrvCkSXrspfu5dTTGpDQEDAFDwBAwBAyBJkKg2dmaAaDZIbcKG4JAIJpQKIq4OI6N+tUjc20kJXLRokVQJf2cs8/GEUccgc022wy1vW+rK7TZ2blupVaNC8JGWZYTkVqx03iWxwJkZghVbERRUVEqXrNWyk8QnsTJ7lYEIdt6VQrcPxioEHBfKm+oLNonqf6SRWzps9WCxYIFC/DrX/8ap5xyCsaMGYPevXuDJHQjU676M0lfpcgMV+Un6fiQrCq5Qpy2i0zlU5kgXpVVqULGBgZ+/PFH9/g/PamAIWbO/Ar/+Nejrq9VBqW0MpiuiiR0PJJ0TyccceQRgAooRCHY1qIR0D7y6bvzZ/PNNncGyF/+8peuz1VwkuX9SxK2GQKGgCFgCBgChkB7R6D5228GgObH3GpsJARUgcpkFar2LnNqNQCMHLkTBm48ELoCV5sC6Ud8l09m6VAdq/K8XJVYlG2RaKTMVxcnxMqVK11GNR6oGuwCehBts6CwI7baeiscffTR7l8E9H11MmVs0CzNTSRBav2o8wfr6itjMkhihx12wNZbb40NNtjAKbkka2TTq1evGtM1MUwB7OQna+aXVrC13OJFi9VpEtKnP8rl8jzoEys33HADli5bWl4fWb2sJHHs0cdgww0HyNAJgOqzwraWgQBJuYyEGDt2LCZNmoRhw4Y5wXQckNaBDgw7GAKGgCFgCBgChsAaBNaDzwwA6wF0q7JpECA9UH767nUikQApISFdZdUJeHW16vvgw4cPgyr6nuQv0yXXZBdlHUwFo9FYylOnI1Hxke8yJlpWvMuWLcfnn3+Bd96ZhklPTnIfCXvxxRfx008/OSVCszUbSRv79umD0aN3lxX6M/GrXx3gVq9rw66+8iUTSXz22WeufTX1ifLVdKU+Ipd+NA0io8ZXRSShir2SlkEdN8W6jlnrna1cDpFb/fSAWd/Nxuuvv+7aXxeG3bp1xxlnngHfj9S5TF34Wp6mQSAaieKEE05w/wzSv3//8j4jU4aBpqnVuBoChoAhYAgYAoZAa0VgfcgtU9L1Ua3VaQg0BQKB6IgBFi1ehJ8X/Iy00q5KISkaN6rfBg8eDN/z3YSdorBVyClFWcZMJ/UV0moI6OsJKotmobe2AqBKoX6f4Msvv8TCRQvdyriuije20q3110oEfvjxB7z22v/w4IN/wwUXXoTdd98dl1xyCaZMmbLmVYZaGdWcQf+ZYcaMGS6T9ovz1HBQjLp27eqeFlAMSRFU8pMpV7xu13xqJNDXPVxEDQfNq6RZ5s6dq06Tko4Drc8ZlkTsx/71GLTtGkdKRA21a56DfnUwevfqDYR2ua4BqmZLIgnZXR+ShE8fEoPcnFzovz7ccccd6NChA0iW5yElhxBsMwQMAUPAEDAEDAFDYA0C68VnM8r1ArtV2hQIOAVLlHf9+7X5P82vVxXbjdgOHfJl0g6ZqHusUDYVCqEK5m67jaqQVlOAwmvGZyllVxW5mvJ2l5VefSx++PDhTtlVBbGm/E2RpjImgjiWLV+GjTbeCPq4ur6eoH8BqG1vjDpVGf7kk0/qxErlUdJXAPbca09RgAHVoTw5aDwyNpIoKChAt27dMmKr9pJ0hp4VK1ZA39OvOlfDY0muzUSi9CmPb775RtqSkmPtTBVj9DsJ+heXYS0fS6xYykJNi4B0pF5w5HqjY3HwoMG4/777cdJJJyE7O9tVTUoe57">
        </div>
        <div class="footer">Document generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</div>
        
        <div class="section">
            <h2>A. Business Information</h2>
            <div class="grid-container">
                <div class="field"><span class="label">Legal Business Name</span><span class="value">${formatValue(data.legal_name)}</span></div>
                <div class="field"><span class="label">DBA / Trade Name</span><span class="value">${formatValue(data.trade_name)}</span></div>
                <div class="field"><span class="label">Primary Contact Name</span><span class="value">${formatValue(data.contact_name)}</span></div>
                <div class="field"><span class="label">Title / Role</span><span class="value">${formatValue(data.title_role)}</span></div>
                <div class="field"><span class="label">Email Address</span><span class="value">${formatValue(data.email)}</span></div>
                <div class="field"><span class="label">Phone Number</span><span class="value">${formatValue(data.phone)}</span></div>
                <div class="field"><span class="label">City / Borough</span><span class="value">${formatValue(data.city)}</span></div>
                <div class="field"><span class="label">ZIP Code</span><span class="value">${formatValue(data.zip_code)}</span></div>
                <div class="field"><span class="label">Number of Locations</span><span class="value">${formatValue(data.locations)}</span></div>
                <div class="field"><span class="label">Business Type</span><span class="value">${formatValue(data.business_type)}</span></div>
                <div class="field grid-full"><span class="label">Main Address</span><span class="value">${formatValue(data.address)}</span></div>
                <div class="field grid-full"><span class="label">Operating Hours</span><div class="value">${formatOperatingHours(data.operating_hours)}</div></div>
            </div>
        </div>

        <div class="section">
            <h2>B. Operational Profile</h2>
            <div class="grid-container">
                <div class="field"><span class="label">Average Orders / Day</span><span class="value">${formatValue(data.avg_orders)}</span></div>
                <div class="field"><span class="label">Average Ticket ($)</span><span class="value">${formatValue(data.avg_ticket)}</span></div>
                <div class="field"><span class="label">Peak Hours</span><span class="value">${formatValue(data.peak_hours)}</span></div>
                <div class="field"><span class="label">Own Delivery Drivers?</span><span class="value">${formatValue(data.own_drivers)}</span></div>
                <div class="field"><span class="label">Currently Self-Delivering?</span><span class="value">${formatValue(data.self_delivering)}</span></div>
                <div class="field"><span class="label">Currently Using 3PL?</span><span class="value">${formatValue(data.using_3pl)}</span></div>
                <div class="field grid-full"><span class="label">Current Pain Points</span><span class="value">${formatValue(data.pain_points)}</span></div>
            </div>
        </div>

        <div class="section">
            <h2>C. Current Channels & Tech</h2>
            <div class="grid-container">
                <div class="field"><span class="label">Active Delivery Platforms</span><span class="value">${formatValue(data.delivery_platforms)}</span></div>
                <div class="field"><span class="label">POS / Middleware System</span><span class="value">${formatValue(data.pos_system)}</span></div>
                <div class="field"><span class="label">Own Website with Orders?</span><span class="value">${formatValue(data.own_website)}</span></div>
                <div class="field"><span class="label">Own App?</span><span class="value">${formatValue(data.own_app)}</span></div>
            </div>
        </div>

        <div class="section">
            <h2>D. Motoclick Integration</h2>
            <div class="grid-container">
                <div class="field"><span class="label">Service Type</span><span class="value">${formatValue(data.service_type)}</span></div>
                <div class="field"><span class="label">Target Go Live Date</span><span class="value">${formatValue(data.go_live)}</span></div>
                <div class="field grid-full"><span class="label">Main Problem to Solve</span><span class="value">${formatValue(data.main_problem)}</span></div>
            </div>
        </div>

        <div class="section">
            <h2>E. Billing & Payment Information</h2>
            <div class="grid-container">
                <div class="field"><span class="label">Legal Name for Contract</span><span class="value">${formatValue(data.contract_name)}</span></div>
                <div class="field"><span class="label">EIN / Tax ID</span><span class="value">${formatValue(data.ein_tax_id)}</span></div>
                <div class="field grid-full"><span class="label">Billing Address</span><span class="value">${formatValue(data.billing_address)}</span></div>
                <div class="field grid-full"><span class="label">Authorized Signatory</span><span class="value">${formatValue(data.authorized_signatory)}</span></div>
            </div>
            <p style="font-size: 11px; color:#555; margin-top: 10px;"><i>Note: Card details are collected securely via DocuSign, not via this onboarding form. Weekly automatic debit is applied every Monday.</i></p>
        </div>

        <div class="section">
            <h2>F. Communication Preferences</h2>
            <div class="grid-container">
                <div class="field"><span class="label">Preferred Channel</span><span class="value">${formatValue(data.comm_channel)}</span></div>
                <div class="field grid-full"><span class="label">Additional Notes</span><span class="value">${formatValue(data.notes)}</span></div>
            </div>
        </div>

        <div class="signature-block">
            <div>
                <br><br><br>
                <div class="sig-line">Signature - ${formatValue(data.authorized_signatory)}</div>
                <div style="text-align: center; font-size: 10px; margin-top:3px;">Authorized Signatory</div>
            </div>
            <div>
                <br><br><br>
                <div class="sig-line">Date</div>
            </div>
        </div>

        <div class="footer">Motoclick Internal Document - Confidential & Proprietary</div>
    </body>
    </html>
    `;

    return htmlTemplate;
}

export function openPdfPreview(data: any) {
    const htmlTemplate = getPdfHtmlTemplate(data);
    const printWindow = window.open('', '_blank');
    if (printWindow) {
        printWindow.document.open();
        printWindow.document.write(htmlTemplate);
        printWindow.document.close();
    } else {
        alert("Please allow popups for this website to generate PDFs.");
    }
}

export async function generatePdfBlob(data: any): Promise<Blob | null> {
    const htmlTemplate = getPdfHtmlTemplate(data);
    const cleanHtml = htmlTemplate.replace(/<div class="no-print"[\\s\\S]*?<\/div>/, '');

    return new Promise((resolve) => {
        const iframe = document.createElement('iframe');
        iframe.style.position = 'fixed';
        iframe.style.width = '800px';
        iframe.style.height = '1120px';
        iframe.style.top = '0';
        iframe.style.left = '0';
        iframe.style.zIndex = '-9999';
        document.body.appendChild(iframe);

        iframe.contentWindow?.document.open();
        iframe.contentWindow?.document.write(cleanHtml);
        iframe.contentWindow?.document.close();

        setTimeout(async () => {
            const opt = {
                margin:       [0.5, 0, 0.5, 0] as [number, number, number, number],
                filename:     'onboarding.pdf',
                image:        { type: 'jpeg' as const, quality: 0.98 },
                html2canvas:  { scale: 2, useCORS: true, windowWidth: 800 },
                jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' as const }
            };

            try {
                const element = iframe.contentWindow?.document.body;
                if (!element) throw new Error("Iframe body not found");
                const worker = html2pdf().set(opt).from(element);
                const pdfBlob = await worker.output('blob');
                
                document.body.removeChild(iframe);
                resolve(pdfBlob);
            } catch (err) {
                console.error('Error generating PDF blob:', err);
                if (document.body.contains(iframe)) {
                    document.body.removeChild(iframe);
                }
                resolve(null);
            }
        }, 1200); 
    });
}
