export function initReveal(selector = '[data-reveal]') {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReduced) {
    document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
      el.classList.add('is-visible')
    })
    return
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
  )

  document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
    observer.observe(el)
  })
}
