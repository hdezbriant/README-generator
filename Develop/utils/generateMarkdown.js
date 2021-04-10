function renderLicenseSection(licenses) {
    let licenseText;
    switch (licenses) {
        case "MIT":
            licenseText = "[The MIT License](https://opensource.org/licenses/MIT)";
            break;
        case "BSD3":
            licenseText = '[The 3-Clause BSD License](https://opensource.org/licenses/BSD-3-Clause)';
            break;
        case "Apache":
            licenseText = "[Apache License, Version 2.0](https://opensource.org/licenses/Apache-2.0)";
            break;
        default:
            return "";
    }
    return `## License \n ${licenseText}`;
}

module.exports = renderLicenseSection;
