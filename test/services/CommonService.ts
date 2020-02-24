import { sequelize } from './../config/database';

// Instead of using function from controller
// Calling service when needed
export class CommonService {
  public async extractReceipientFromText(text: string, condition: any) {
    try {
      let textReceipient = [];
      // Loop in notification until no more @receipient
      do {
        // Get index start from @ and substring
        let startIndex = text.indexOf('@');
        text = text.substring(startIndex + 1);

        let endIndex = text.indexOf(' ');
        endIndex = endIndex < 0 ? text.length : endIndex;

        // Push receipient into text receipient
        textReceipient.push(text.substring(0, endIndex));

        // Replace leftover string to text
        text = text.substring(endIndex + 1);
      } while (text.includes(condition));
      return textReceipient;
    } catch (e) {
      throw e;
    }
  }
  public async query(raw: string, replacements: any, type: any) {
    try {
      return await sequelize.query(raw, {
        replacements,
        type
      });
    } catch (e) {
      throw e;
    }
  }
}
