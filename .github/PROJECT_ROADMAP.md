# Baustein v0.3.0 Roadmap

This project tracks the development of version 0.3.0 - focusing on verb conjugation and spaced repetition features.

## 🎯 Milestone Goals

### Core Features
- [ ] Verb conjugation practice system
- [ ] Spaced repetition algorithm (mistake-based review)
- [ ] Progress tracking with mastery levels

### Database Schema
- [ ] Add conjugation JSONB support to vocabulary table
- [ ] Create practice_sessions table for history tracking
- [ ] Add mastery_level enum transitions

### UI Components
- [ ] Verb trainer component (present tense)
- [ ] Review queue dashboard
- [ ] Progress charts and statistics

### Documentation
- [ ] Update README with new features
- [ ] Add verb conjugation guide to docs
- [ ] Create sample conjugation data

## 📝 Issue Templates

Create these issues in GitHub:

### High Priority
1. **feat(practice): implement verb conjugation trainer** (#)
   - Support for sein, haben, regular verbs
   - Present tense only (A1.1 scope)
   - Interactive conjugation quiz

2. **feat(algorithm): add spaced repetition system** (#)
   - Track mistake_count and correct_count
   - Calculate review intervals
   - Priority queue for words needing practice

3. **feat(progress): add mastery level tracking** (#)
   - new → learning → review → mastered
   - Visual progress indicators
   - Daily streak counter

### Medium Priority
4. **feat(db): extend vocabulary schema for conjugation** (#)
5. **feat(ui): create review dashboard** (#)
6. **docs: add conjugation examples and guides** (#)

### Nice to Have
7. **feat(stats): add detailed analytics page** (#)
8. **feat(export): add vocabulary import/export** (#)
9. **feat(audio): add pronunciation support** (#)

## 🚀 Release Criteria

Version 0.3.0 will be released when:
- ✅ Verb conjugation practice is functional
- ✅ Spaced repetition is implemented
- ✅ Progress tracking works
- ✅ All critical bugs are fixed
- ✅ Documentation is updated

Target: ~2-3 weeks
