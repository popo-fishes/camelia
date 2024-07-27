/*
 * @Date: 2024-01-17 22:28:27
 * @Description: Modify here please
 */
import type MarkdownIt from "markdown-it";

export default (md: MarkdownIt): void => {
  md.renderer.rules.text = (tokens, idx) => {
    const token = tokens[idx];
    const tagRegExp = /^\^\[.*\]$/;

    // 去掉空格
    const trimmedStr = token.content.trim();
    if (tagRegExp.test(trimmedStr)) {
      // 判断多个值 /分割
      const parts = token.content.split("/");
      let code = "";
      if (parts.length) {
        parts.forEach((item, index) => {
          const regex = /\^\[(.+)\]/;
          const matches = item.match(regex);
          // console.log(matches);
          if (matches && matches.length) {
            code = code + `${index > 0 ? "<span class='type-tag-line'>/</span>" : ""} <span class="type-tag">${matches[1]}</span>`;
          }
        });
        // console.log(code);
        return code;
      }
      return token.content;
    } else {
      return token.content;
    }
  };
};
