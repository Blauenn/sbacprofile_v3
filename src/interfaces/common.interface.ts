export interface Student {
  primary_student_ID: number;
  student_ID: number;
  student_first_name: string;
  student_last_name: string;
  student_nickname: string;
  student_first_name_thai: string;
  student_last_name_thai: string;
  student_nickname_thai: string;
  student_major: number;
  student_level: number;
  student_class: number;
  student_phone: string;
  student_line_ID: string;
  student_image: string;
  student_email: string;
}

export interface Teacher {
  primary_teacher_ID: number;
  teacher_ID: number;
  teacher_first_name: string;
  teacher_last_name: string;
  teacher_nickname: string;
  teacher_first_name_thai: string;
  teacher_last_name_thai: string;
  teacher_nickname_thai: string;
  teacher_major: number;
  teacher_phone: string;
  teacher_line_ID: string;
  teacher_image: string;
  teacher_email: string;
}

export interface Major {
  major_ID: number;
  major_name: string;
}

export interface Classroom {
  classroom_ID: number;
  classroom_level: number;
  classroom_class: number;
  classroom_major: number;
  classroom_homeroom_teacher: number;
}
