'use strict';

class TemplateProcessor {
    constructor(template) {
        this.template = template;
    }
    fillIn(dictionary) {
        let returnString = this.template;
        for (const property in dictionary) {
            if (Object.prototype.hasOwnProperty.call(dictionary, property)) {
                const regex = new RegExp("{{" + property + "}}", "g");
                returnString = returnString.replace(regex, dictionary[property]);
            }
        }
        const regex = /{{.*?}}/g; // Updated regex to match non-greedy
        returnString = returnString.replace(regex, "");
        return returnString;
    }
}

// Example usage:
const template = "Hello, {{name}}! Today is {{day}}.";
const dictionary = { name: "Alice", day: "Monday" };
const processor = new TemplateProcessor(template);
const result = processor.fillIn(dictionary);
console.log(result);
