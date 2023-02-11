import moment from "moment";

export const getInterestType = (type) => {
  if (type === "photo") {
    return "Photo Request";
  } else if (type === "horoscope") {
    return "Horoscope Request";
  } else if (type === "contact") {
    return "Contact Request";
  } else {
    return "Interest Request";
  }
};

export const getRequestDescription = (t, data, status, user_id) => {
  if (data.type === "photo") {
    if (data?.user?.id !== user_id) {
      if (status === "request") {
        return t("send_photo_request_message", {
          user_name: data?.user?.member_profile?.name,
        });

        // return `${data?.user?.member_profile?.name} has send photo request to you`;
      }
      if (status === "accepted") {
        return t("accepted_send_photo_request_message", {
          user_name: data?.user?.member_profile?.name,
        });
        // return `You accepted ${data?.user?.member_profile?.name}'s send photo request`;
      }
      if (status === "rejected") {
        return t("rejected_send_photo_request_message", {
          user_name: data?.user?.member_profile?.name,
        });
        // return `You rejected ${data?.user?.member_profile?.name}'s send photo request`;
      }
    } else {
      if (status === "request") {
        return t("requested_photo_message", {
          user_name: data?.member?.member_profile?.name,
        });
        // return `You has requested ${data?.member?.member_profile?.name}'s photo`;
      }
      if (status === "accepted") {
        return t("accepted_photo_request_message", {
          user_name: data?.member?.member_profile?.name,
        });
        // return `${data?.member?.member_profile?.name} has accepted your photo request`;
      }
      if (status === "rejected") {
        return t("rejected_photo_request_message", {
          user_name: data?.member?.member_profile?.name,
        });
        // return `${data?.member?.member_profile?.name}has rejected your photo request`;
      }
    }
  } else if (data.type === "horoscope") {
    if (data?.user?.id !== user_id) {
      if (status === "request") {
        return t("send_horoscope_request_message", {
          user_name: data?.user?.member_profile?.name,
        });
        // return `${data?.user?.member_profile?.name} send horoscope request`;
      }
      if (status === "accepted") {
        return t("accepted_send_horoscope_request_message", {
          user_name: data?.user?.member_profile?.name,
        });
        // return `You accepted ${data?.user?.member_profile?.name}'s send horoscope request`;
      }
      if (status === "rejected") {
        return t("rejected_send_horoscope_request_message", {
          user_name: data?.user?.member_profile?.name,
        });
        // return `You rejected ${data?.user?.member_profile?.name}'s send horoscope request`;
      }
    } else {
      if (status === "request") {
        return t("requested_horoscope_message", {
          user_name: data?.member?.member_profile?.name,
        });
        // return `You has requested ${data?.member?.member_profile?.name}'s horoscope`;
      }
      if (status === "accepted") {
        return t("accepted_horoscope_message", {
          user_name: data?.member?.member_profile?.name,
        });
        // return `${data?.member?.member_profile?.name} has accepted your horoscope request`;
      }
      if (status === "rejected") {
        return t("rejected_horoscope_message", {
          user_name: data?.member?.member_profile?.name,
        });
        // return `${data?.member?.member_profile?.name}has rejected your horoscope request`;
      }
    }
  } else if (data.type === "contact") {
    if (data?.user?.id !== user_id) {
      if (status === "request") {
        return t("send_contact_request_message", {
          user_name: data?.user?.member_profile?.name,
        });
        // return `${data?.user?.member_profile?.name} send contact request to you`;
      }
      if (status === "accepted") {
        return t("accepted_send_contact_request_message", {
          user_name: data?.user?.member_profile?.name,
        });
        // return `You accepted ${data?.user?.member_profile?.name}'s send contact request`;
      }
      if (status === "rejected") {
        return t("rejected_send_contact_request_message", {
          user_name: data?.user?.member_profile?.name,
        });
        // return `You rejected ${data?.user?.member_profile?.name}'s send contact request`;
      }
    } else {
      if (status === "request") {
        return t("requested_contact_message", {
          user_name: data?.member?.member_profile?.name,
        });
        // return `You has requested ${data?.member?.member_profile?.name}'s contact`;
      }
      if (status === "accepted") {
        return t("accepted_contact_request_message", {
          user_name: data?.member?.member_profile?.name,
        });
        // return `${data?.member?.member_profile?.name} has accepted your contact request`;
      }
      if (status === "rejected") {
        return t("rejected_contact_request_message", {
          user_name: data?.member?.member_profile?.name,
        });
        // return `${data?.member?.member_profile?.name}has rejected your contact request`;
      }
    }
  } else {
    if (data?.user?.id !== user_id) {
      if (status === "request") {
        return t("send_interest_request_message", {
          user_name: data?.user?.member_profile?.name,
        });
        // return `${data?.user?.member_profile?.name} send interest request to you`;
      }
      if (status === "reminder") {
        return t("send_interest_reminder_received_request_message", {
          user_name: data?.user?.member_profile?.name,
        });
      }
      if (status === "accepted") {
        return t("accepted_send_interest_request_message", {
          user_name: data?.user?.member_profile?.name,
        });
        // return `You accepted ${data?.user?.member_profile?.name}'s send interest request`;
      }
      if (status === "rejected") {
        return t("rejected_send_interest_request_message", {
          user_name: data?.user?.member_profile?.name,
        });
        // return `You rejected ${data?.user?.member_profile?.name}'s send interest request`;
      }
    } else {
      if (status === "request") {
        return t("requested_interest_message", {
          user_name: data?.member?.member_profile?.name,
        });
        // return `You has requested ${data?.member?.member_profile?.name}'s interest`;
      }
      if (status === "reminder") {
        return t("send_interest_reminder_request_message", {
          user_name: data?.member?.member_profile?.name,
        });
      }
      if (status === "accepted") {
        return t("accepted_send_interest_message", {
          user_name: data?.member?.member_profile?.name,
        });
        // return `${data?.member?.member_profile?.name} has accepted your interest request`;
      }
      if (status === "rejected") {
        return t("rejected_send_interest_message", {
          user_name: data?.member?.member_profile?.name,
        });
        // return `${data?.member?.member_profile?.name}has rejected your interest request`;
      }
    }
  }
};

export const showButtonInrequest = (data, _user_id) => {
  if (
    data.type !== "interest" &&
    data.user?.id !== _user_id &&
    !data.accepted_datetime &&
    !data.rejected_datetime
  ) {
    return "acceptAndReject";
  } else if (
    data.type === "interest" &&
    data.user?.id === _user_id &&
    !data.accepted_datetime &&
    !data.rejected_datetime &&
    !data.reminder_datetime &&
    moment().diff(data.requested_datetime, "days") > 0
  ) {
    return "reminder";
  } else if (
    data.type === "interest" &&
    data.user?.id !== _user_id &&
    !data.accepted_datetime &&
    !data.rejected_datetime
  ) {
    return "acceptAndReject";
  } else if (
    data.type === "interest" &&
    data.user?.id === _user_id &&
    !data.accepted_datetime &&
    !data.rejected_datetime &&
    data.reminder_datetime &&
    data.updated_datetime &&
    data.requested_datetime
  ) {
    return "";
  } else {
    return "";
  }
};
