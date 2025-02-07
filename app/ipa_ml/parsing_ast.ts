enum tokenType {
  BOLD,
  ITALIC,
  STRING,
  TEXT,
}

const possibleTokens = ['*', '`', '#']

type Token = {
  type: tokenType;
  lexeme?: string;
};

type ReaderFunc = {
  peek: (nth?: number) => string | undefined;
  consume: (nth?: number) => string | undefined;
  isEOF: () => boolean;
};


class Reader {
    private pos = 0;

    peek(): string {
        return this.input[this.pos];
    }

    consume(): string {
        const char = this.input[this.pos++];
        return char;
    }
    isEOF(): boolean {
        return this.pos >= this.input.length;
    }


    constructor(private input: string) {}
}

class Lexer {
    private input: string;
    private tokens: Token[] = [];
    private reader: Reader;

    constructor(input: string) {
        this.input = input;
        this.reader = new Reader(this.input);
    }

    scanToken() {
        const cur = this.reader.consume();
        switch(cur) {
            case '\n':
                break;
            case '*':
                this.addToken(tokenType.BOLD);
            case '`':
                this.addToken(tokenType.ITALIC);
        default:
            this.stringLiteral(cur);

        }
    }

    stringLiteral(cur: string) {
        let resultStr = cur;
        while(!possibleTokens.includes(this.reader.peek()) && !this.reader.isEOF()){
            resultStr += this.reader.consume();
        }

        this.addToken(tokenType.TEXT, resultStr);
    }


    addToken(type: tokenType, lexeme?: string) {
        this.tokens.push({type, lexeme});
    }
}

function ReaderFunc(chars: string) {
  let i = 0;
  function peek(nth: number = 0) {
    return chars[i + nth];
  }
  function consume(nth: number = 0) {
    const c = chars[i + nth];
    i = i + nth + 1;

    return c;
  }

  function isEOF() {
    return chars.length - 1 < i;
  }

  return Object.freeze({
    peek,
    consume,
    isEOF,
  });
}
