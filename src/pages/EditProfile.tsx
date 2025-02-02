import { z } from "zod";

const schema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .max(150, "Username is too long"),
  switchType: z.string().min(1, "Switch Type is required"),
  icon: z.any(),
});

interface IForm {
  username: string;
  switchType: string;
  icon: File;
}

function EditProfile() {
  return <div>EditProfile</div>;
}

export default EditProfile;
