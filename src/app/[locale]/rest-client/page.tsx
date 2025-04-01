import { redirect } from "next/navigation";

export default function Page() {
  console.log('asd')
  return redirect('/rest-client/GET');
}
