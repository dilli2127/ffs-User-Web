import { useTranslation } from "react-i18next";

export const getNotificationCustomMessage = (t, data, user_id) => {
  if (data.type === "photo_verification_approved") {
    return `photo_verification_approved`;
    // return `Your photo verification approved`;
  } else if (data.type === "gothram_verification_approved") {
    return `gothram_verification_approved`;

    // return `Your gothram verification approved`;
  } else if (data.type === "anchestor_origin_verification_approved") {
    return `anchestor_origin_verification_approved`;

    // return `Your anchestor origin verification approved`;
  } else if (data.type === "institution_verification_approved") {
    return `institution_verification_approved`;

    // return `Your institution verification approved`;
  } else if (data.type === "name_verification_approved") {
    return `name_verification_approved`;

    // return `Your name verification approved`;
  } else if (data.type === "employer_verification_approved") {
    return `employer_verification_approved`;

    // return `Your employer verification approved`;
  }
  if (data.type === "member_visit") {
    if (data?.user?.id !== user_id) {
      return t("member_visited_you_message", {
        user_name: data?.member?.member_profile?.name,
      });
    } else {
      return t("member_visited_you_message", {
        user_name: data?.member?.member_profile?.name,
      });
    }
  }
  if (data.type === "shortlist") {
    if (data?.user?.id !== user_id) {
      return t("shortlisted_you_message", {
        user_name: data?.user?.member_profile?.name,
      });
    } else {
      return t("shortlisted_you_message", {
        user_name: data?.member?.member_profile?.name,
      });
    }
  }
  if (data.type === "requested_photo_view") {
    if (data?.user?.id !== user_id) {
      return t("photo_request_message", {
        user_name: data?.user?.member_profile?.name,
      });
    } else {
      return t("photo_request_message", {
        user_name: data?.member?.member_profile?.name,
      });
    }
  }
  if (data.type === "requested_contact_view") {
    if (data?.user?.id !== user_id) {
      return t("contact_request_message", {
        user_name: data?.user?.member_profile?.name,
      });
    } else {
      return t("contact_request_message", {
        user_name: data?.member?.member_profile?.name,
      });
    }
  }
  if (data.type === "requested_horoscope_view") {
    if (data?.user?.id !== user_id) {
      return t("horoscope_request_message", {
        user_name: data?.user?.member_profile?.name,
      });
    } else {
      return t("horoscope_request_message", {
        user_name: data?.member?.member_profile?.name,
      });
    }
  }
  if (data.type === "sent_interest") {
    if (data?.user?.id !== user_id) {
      return t("send_interest_to_you_message", {
        user_name: data?.user?.member_profile?.name,
      });
    } else {
      return t("send_interest_to_you_message", {
        user_name: data?.member?.member_profile?.name,
      });
    }
  }
  if (data.type === "sent_interest_reminder") {
    if (data?.user?.id !== user_id) {
      return t("send_interest_reminder_you_message", {
        user_name: data?.user?.member_profile?.name,
      });
    } else {
      return t("send_interest_reminder_you_message", {
        user_name: data?.member?.member_profile?.name,
      });
    }
  }
  if (data.type === "accepted_photo_view") {
    if (data?.user?.id !== user_id) {
      return t("accepted_photo_message", {
        user_name: data?.user?.member_profile?.name,
      });
    } else {
      return t("accepted_photo_message", {
        user_name: data?.member?.member_profile?.name,
      });
    }
  }
  if (data.type === "accepted_contact_view") {
    if (data?.user?.id !== user_id) {
      return t("accepted_contact_message", {
        user_name: data?.user?.member_profile?.name,
      });
    } else {
      return t("accepted_contact_message", {
        user_name: data?.member?.member_profile?.name,
      });
    }
  }
  if (data.type === "accepted_horoscope_view") {
    if (data?.user?.id !== user_id) {
      return t("accepted_horoscope_message", {
        user_name: data?.user?.member_profile?.name,
      });
    } else {
      return t("accepted_horoscope_message", {
        user_name: data?.member?.member_profile?.name,
      });
    }
  }
  if (data.type === "accepted_interest") {
    if (data?.user?.id !== user_id) {
      return t("accepted_interest_message", {
        user_name: data?.user?.member_profile?.name,
      });
    } else {
      return t("accepted_interest_message", {
        user_name: data?.member?.member_profile?.name,
      });
    }
  } else {
    return `Verification`;
  }
};
