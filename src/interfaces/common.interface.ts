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

export interface LeaveNotice {
  leave_notice_ID: number;
  leave_notice_student_ID: number;
  leave_notice_student_classroom?: string;
  leave_notice_student_major?: number;
  leave_notice_description: string;
  leave_notice_choice: number;
  leave_notice_start_datetime: string;
  leave_notice_end_datetime: string;
  leave_notice_duration: number;
  leave_notice_create_datetime: string;
  leave_notice_attached_file: string;
  leave_notice_teacher_ID: number;
  leave_notice_teacher_status: number;
  leave_notice_teacher_description: string;
  leave_notice_teacher_change_datetime: string;
  leave_notice_head_ID: number;
  leave_notice_head_status: number;
  leave_notice_head_description: string;
  leave_notice_head_change_datetime: string;
}