import { Extension } from '@tiptap/core';

export const AutoCorrect = Extension.create({
  name: 'autoCorrect',

  addInputRules() {
    return [
      // 1. Auto-capitalize the letter "i" when it's alone
      {
        find: / (i) $/ ,
        handler: ({ range, chain }) => {
          chain().insertContentAt(range, ' I ').run();
        },
      },
      // 2. Common typo: "teh" -> "the"
      {
        find: / (teh) $/ ,
        handler: ({ range, chain }) => {
          chain().insertContentAt(range, ' the ').run();
        },
      },
      // 3. Common typo: "dont" -> "don't"
      {
        find: / (dont) $/ ,
        handler: ({ range, chain }) => {
          chain().insertContentAt(range, " don't ").run();
        },
      }
    ];
  },
});