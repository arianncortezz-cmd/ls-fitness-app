import type { Student } from "@/data/students";

type Props = {
  student: Pick<Student, "initials" | "avatarBg" | "avatarText" | "name">;
  size?: "sm" | "md" | "lg";
};

const sizeMap = {
  sm: "w-9 h-9 text-xs",
  md: "w-11 h-11 text-sm",
  lg: "w-16 h-16 text-lg",
};

export function StudentAvatar({ student, size = "md" }: Props) {
  return (
    <div
      className={`${sizeMap[size]} ${student.avatarBg} ${student.avatarText} rounded-full flex items-center justify-center font-semibold flex-shrink-0`}
      aria-label={student.name}
    >
      {student.initials}
    </div>
  );
}
