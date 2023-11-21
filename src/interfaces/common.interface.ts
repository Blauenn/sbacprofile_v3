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
  student_position?: number;
  student_gender?: number;
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
  teacher_position?: number;
  teacher_gender?: number;
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

export interface RequestForm {
  request_form_ID: number;
  request_form_student_ID: number;
  request_form_student_classroom?: string;
  request_form_student_major?: number;
  request_form_title: string;
  request_form_description: string;
  request_form_create_datetime: string;
  request_form_attached_file: string;
  request_form_teacher_ID: number;
  request_form_teacher_status: number;
  request_form_teacher_description: string;
  request_form_teacher_change_datetime: string;
  request_form_head_ID: number;
  request_form_head_status: number;
  request_form_head_description: string;
  request_form_head_change_datetime: string;
}

export interface Announcement {
  announcement_ID: number;
  announcement_status?: number;
  announcement_title: string;
  announcement_description: string;
  announcement_image: string;
  announcement_create_datetime: string;
}

export interface Club {
  club_ID: number;
  club_name: string;
  club_major: number;
  club_status: number;
  club_description: string;
  club_image: string;
  club_capacity: number;
}
export interface ClubMembership {
  club_membership_ID: number;
  club_membership_club_ID: number;
  club_membership_student_ID: number;
}
export interface ClubManager {
  club_manager_ID: number;
  club_manager_club_ID: number;
  club_manager_teacher_ID: number;
}
export interface ClubJoinRequest {
  club_join_request_ID: number;
  club_join_request_status: number;
  club_join_request_club_ID: number;
  club_join_request_student_ID: number;
  club_join_request_create_datetime: string;
  club_join_request_status_change_datetime: string;
}
export interface ClubLeaveRequest {
  club_leave_request_ID: number;
  club_leave_request_status: number;
  club_leave_request_club_ID: number;
  club_leave_request_student_ID: number;
  club_leave_request_create_datetime: string;
  club_leave_request_status_change_datetime: string;
}

export interface ValidationErrors {
  [key: string]: any;
}
