import { MobileMenu } from "./MobileMenu";
import { ModelSelect } from "./ModelSelect";

export function Header() {
    return (
        <header className="flex items-center p-2">
            {/* 모바일메뉴 */}
            <MobileMenu />
            {/* 모델 선택 */}
            <ModelSelect />
        </header>
    );
}
