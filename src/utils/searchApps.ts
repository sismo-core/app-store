import { AppFront } from "../app/(home)/page"

export function searchApps({input, apps}: {input: string, apps: AppFront[]}) {
  if(!input) return apps;

  const search = input.toLowerCase().trim(); 
  return apps.filter(app => {
    return app.name.toLowerCase()?.includes(search)
    || app.description?.toLowerCase()?.includes(search)
    || app.tags?.some(tag => tag?.toLowerCase()?.includes(search))
    || app.slug?.toLowerCase()?.includes(search)
    || app?.appId?.toLowerCase()?.includes(search)
    || app.claimRequests?.some(claimRequest => claimRequest?.groupId?.toLowerCase()?.includes(search))
    || app.space?.toLowerCase()?.includes(search)
    || app.spaceSlug?.toLowerCase()?.includes(search)
  })
}