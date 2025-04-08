import inquirer from "inquirer";
import shell from "shelljs";

(async () => {
    try {
        const { type } = await inquirer.prompt([
            {
                type: "list",
                name: "type",
                message: "커밋 타입을 선택하세요",
                choices: [
                    "✨ feat",
                    "🐛 fix",
                    "♻️  refactor",
                    "💄 style",
                    "📦 chore",
                    "🧼 clean",
                ],
            },
        ]);

        const { message } = await inquirer.prompt([
            {
                type: "input",
                name: "message",
                message: "커밋 메시지를 입력하세요:",
            },
        ]);

        const { confirm } = await inquirer.prompt([
            {
                type: "confirm",
                name: "confirm",
                message: `커밋을 진행할까요? (${type}: ${message})`,
                default: true,
            },
        ]);
        if (!confirm) {
            console.log("커밋이 취소되었습니다.");
            process.exit(0);
        }
        const currentBranch = shell
            .exec("git rev-parse --abbrev-ref HEAD", { silent: true })
            .stdout.trim();
        shell.exec(`git commit -m "${type}: ${message}"`);
        console.log(`✅ 커밋 완료! (${currentBranch} 브랜치)`);
    } catch (error) {
        console.error("⚠️ 오류 발생:", error);
        process.exit(1);
    }
})();
