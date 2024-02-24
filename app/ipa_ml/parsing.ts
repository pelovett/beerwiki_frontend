
const inBlockOpList = ['*'];

interface opCache {
    op: string,
    cache: string,
}

interface formattedTextSection {
    text: string,
    isItalic: boolean,
    isBold: boolean,
}

function parseBlock(rawText: string) {
    let italicsFlag = false;
    let textResult: formattedTextSection[] = [];
    let curText = '';
    for (let i = 0; i < rawText.length; i++) {
        const curChar = rawText.at(i) ?? '';
        if (inBlockOpList.includes(curChar)) {
            italicsFlag = !italicsFlag;

            textResult.push({text: curText, isItalic: italicsFlag, isBold: false});
        }

        curText += curChar;
    }

    return textResult;
}
