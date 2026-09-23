# Brief
route: direct
employees: []
skip: [sprint]
goal: Drop CallMeBot; restore wa.me client notify on contact + partner forms.
non_goals: Silent WA / Meta Cloud API.
success_checks: Submit opens WhatsApp prefilled to 917077404655; email still sends; no CallMeBot.
verify: tsc --noEmit
max_loop_iters: 0
notes: User could not complete CallMeBot setup.
