async function fetchStylesheet(url) {
    const response = await fetch(url);
    const text = await response.text();
    console.log("inside fetchstylesheet contnet");
    return text;
}

function extractHeaderColorsFromCSS(css) {
    const headerColorRegex = /header\s*{[^}]*}/gi; // Match the entire header block
    const colorRegex = /(background-color|color):\s*([^;]+)/gi; // Match background-color and color properties
    const colors = {
        backgroundColor: null,
        color: null
    };

    const headerMatch = css.match(headerColorRegex);
    if (headerMatch) {
        const headerCSS = headerMatch[0];
        let match;
        while ((match = colorRegex.exec(headerCSS)) !== null) {
            if (match[1] === 'background-color') {
                console.log("at exact point of error");
                console.log(match[2].trim());
                colors.backgroundColor = match[2].trim();
            } else if (match[1] === 'color') {
                colors.color = match[2].trim();
            }
        }
    }
    console.log("inside extractheadercolors");
    return colors;
}

async function analyzeContrast(url, resultDivId) {
    try {
        const css = await fetchStylesheet(url);
        const colors = extractHeaderColorsFromCSS(css);
        console.log("the place of error");
        console.log(colors);


        if (colors.backgroundColor && colors.color) {
            const foregroundColor = colors.color;
            const backgroundColor = colors.backgroundColor;

            const contrastRatio = getContrastRatio(foregroundColor, backgroundColor);
            const resultDiv = document.getElementById(resultDivId);
            const passFailText = contrastRatio >= 4.5 ? 'Passes WCAG 2.0' : 'Fails WCAG 2.0';
            const passFailClass = contrastRatio >= 4.5 ? 'pass' : 'fail';

            resultDiv.innerHTML = `
                <div>Foreground Color: <span class="color-display" style="background-color:${foregroundColor}">${foregroundColor}</span></div>
                <div>Background Color: <span class="color-display" style="background-color:${backgroundColor}">${backgroundColor}</span></div>
                <div>Contrast Ratio: <span class="highlight">${contrastRatio.toFixed(2)}</span></div>
                <div class="${passFailClass}">${passFailText}</div>
            `;
        } else {
            document.getElementById(resultDivId).innerHTML = 'Colors not found in header.';
        }
    } catch (error) {
        console.error('Error fetching CSS:', error);
        document.getElementById(resultDivId).innerHTML = 'Error fetching styles.';
    }
    console.log("inside analyse contrast");
}

function parseColor(color) {
    const colors = {
        "white": "#FFFFFF",
        "black": "#000000"
    };
    if (colors[color.toLowerCase()]) {
        color = colors[color.toLowerCase()];
    }
    if (color.startsWith('#')) {
        return hexToRgb(color);
    }
    console.log("inside parsecolor");
    return [0, 0, 0];
}

function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    console.log("inside hex to rgb");
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

function getLuminance(r, g, b) {
    const a = [r, g, b].map(v => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    console.log("luminiscenece function: " + a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722);
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function getContrastRatio(foreground, background) {
    const [r1, g1, b1] = parseColor(foreground);
    const [r2, g2, b2] = parseColor(background);

    const luminance1 = getLuminance(r1, g1, b1);
    const luminance2 = getLuminance(r2, g2, b2);

    console.log("contrast ratio function: " + (Math.max(luminance1, luminance2) + 0.05) / (Math.min(luminance1, luminance2) + 0.05));
    return (Math.max(luminance1, luminance2) + 0.05) / (Math.min(luminance1, luminance2) + 0.05);
}

console.log("just outside everything");
document.addEventListener('DOMContentLoaded', () => {
    console.log("inside event listener DOMContentLoaded");
    analyzeContrast('/styles/fashionsta.css', 'contrastResultA');
    analyzeContrast('/styles/fashionistaB.css', 'contrastResultB');
});