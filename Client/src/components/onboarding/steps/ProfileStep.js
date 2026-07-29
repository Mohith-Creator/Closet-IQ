import React from "react";

import UsernameStep from "./profile/UsernameStep";
import GenderStep from "./profile/GenderStep";
import AvatarStep from "./profile/AvatarStep";

export default function ProfileStep({
  step,
  profile,
  setProfile,
  avatar,
  onUploadAvatar,
}) {
  switch (step) {
    case 0:
      return <UsernameStep profile={profile} setProfile={setProfile} />;

    case 1:
      return <GenderStep profile={profile} setProfile={setProfile} />;

    case 2:
      return <AvatarStep avatar={avatar} onUploadAvatar={onUploadAvatar} />;

    default:
      return null;
  }
}
